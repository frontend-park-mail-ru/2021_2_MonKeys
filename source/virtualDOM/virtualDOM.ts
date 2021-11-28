/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import router from '../route/router.js';

export namespace MonkeysVirtualDOM {
    export type Props = { [key: string]: string | Function };
    export const jsxFactory = (
        type: string | Function,
        props: Props,
        ...children: Array<string | Node | Array<string | Node>>
    ) => {
        if (typeof type === 'function') {
            return { ...type(props) };
        }
        return {
            type,
            props,
            children: children.reduce((acc: Array<any>, el) => {
                if (Array.isArray(el)) {
                    return [...acc, ...el];
                } else {
                    acc.push(el);
                    return acc;
                }
            }, []),
        };
    };

    export const createElement = (virtualNode) => {
        if (typeof virtualNode == 'number') {
            return document.createTextNode(virtualNode.toString());
        }
        if (typeof virtualNode === 'string') {
            return document.createTextNode(virtualNode);
        }

        const rootElement = document.createElement(virtualNode.type);

        if (virtualNode.type === 'img') {
            rootElement.addEventListener(
                'dragstart',
                (e) => {
                    e.preventDefault();
                },
                false
            );
        }
        if (virtualNode.type === 'mon-router') {
            rootElement.addEventListener('click', () => {
                router.go(virtualNode.props['route']);
            });
        }
        virtualNode.props &&
            Object.keys(virtualNode.props).forEach((key) => {
                if (/^on/.test(key)) {
                    rootElement.addEventListener(key.slice(2), virtualNode.props[key]);
                } else {
                    rootElement.setAttribute(key, virtualNode.props[key]);
                }
            });
        virtualNode.children.map(createElement).forEach((childElement) => {
            rootElement.appendChild(childElement);
        });
        return rootElement;
    };

    const changed = (nodeA, nodeB): boolean => {
        return (
            typeof nodeA !== typeof nodeB || (typeof nodeA === 'string' && nodeA !== nodeB) || nodeA.type !== nodeB.type
        );
    };

    const changedProps = (nodeA, nodeB): boolean => {
        let a = false;
        if ((!nodeA.props && nodeB.props) || (nodeA.props && !nodeB.props)) {
            a = true;
        }
        nodeA.props &&
            nodeB.props &&
            Object.keys(nodeA.props).forEach((key) => {
                if (nodeA.props[key] !== nodeB.props[key]) {
                    a = true;
                }
            });
        return a;
    };

    export const update = ($rootElement: string | HTMLElement, currNode, nextNode, index = 0) => {
        const manipulationMapStack = [];
        const updateElement = ($rootElement, currNode, nextNode, index = 0) => {
            if (!nextNode) {
                manipulationMapStack.push({
                    'parent': $rootElement,
                    'method': 'remove',
                    'child': $rootElement.childNodes[index],
                });
            } else if (!currNode) {
                manipulationMapStack.push({
                    'parent': $rootElement,
                    'method': 'append',
                    'newChild': createElement(nextNode),
                });
            } else if (changed(currNode, nextNode)) {
                manipulationMapStack.push({
                    'parent': $rootElement,
                    'method': 'replace',
                    'oldChild': $rootElement.childNodes[index],
                    'newChild': createElement(nextNode),
                });
            } else if (nextNode.type || changedProps(currNode, nextNode)) {
                if (changedProps(currNode, nextNode)) {
                    manipulationMapStack.push({
                        'parent': $rootElement,
                        'method': 'updateProps',
                        'oldChild': $rootElement.childNodes[index],
                        'newChild': nextNode,
                        'oldChildVirtual': currNode,
                    });
                }
                for (let i = 0; i < nextNode.children.length || i < currNode.children.length; i++) {
                    updateElement($rootElement.childNodes[index], currNode.children[i], nextNode.children[i], i);
                }
            }
        };
        updateElement($rootElement, currNode, nextNode, index);

        manipulationMapStack.map((manipulation) => {
            switch (manipulation.method) {
                case 'remove': {
                    if (manipulation.child) {
                        manipulation.parent.removeChild(manipulation.child);
                    }

                    break;
                }
                case 'append': {
                    manipulation.parent.appendChild(manipulation.newChild);
                    break;
                }
                case 'replace': {
                    manipulation.parent.replaceChild(manipulation.newChild, manipulation.oldChild);
                    break;
                }
                case 'updateProps': {
                    manipulation.oldChildVirtual.props &&
                        Object.keys(manipulation.oldChildVirtual.props).forEach((key) => {
                            if (key === 'route') {
                                manipulation.oldChild.removeEventListener('click', () => {
                                    router.go(manipulation.oldChildVirtual.props[key]);
                                });
                            }
                            if (/^on/.test(key)) {
                                manipulation.oldChild.removeEventListener(
                                    key.slice(2),
                                    manipulation.oldChildVirtual.props[key]
                                );
                            } else {
                                manipulation.oldChild.removeAttribute(key);
                            }
                        });
                    manipulation.newChild.props &&
                        Object.keys(manipulation.newChild.props).forEach((key) => {
                            if (key === 'route') {
                                manipulation.oldChild.addEventListener('click', () => {
                                    router.go(manipulation.newChild.props[key]);
                                });
                            }
                            if (key === 'value' && manipulation.newChild.props[key] === '') {
                                manipulation.oldChild.value = '';
                            }
                            if (/^on/.test(key)) {
                                manipulation.oldChild.addEventListener(key.slice(2), manipulation.newChild.props[key]);
                            } else {
                                manipulation.oldChild.setAttribute(key, manipulation.newChild.props[key]);
                            }
                        });
                }
            }
        });
    };
}
