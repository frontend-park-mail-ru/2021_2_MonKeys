import router from "../route/router.js";

  
export namespace MonkeysVirtualDOM {  
  export type Props = { [key: string]: any };
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
      if (typeof virtualNode === 'string') {
        return document.createTextNode(virtualNode);
      }
      const rootElement = document.createElement(virtualNode.type);
      if(virtualNode.type==='mon-router'){
        rootElement.addEventListener('click',()=> {
          router.go(virtualNode.props['route']);
        })
      }
      virtualNode.props && Object.keys(virtualNode.props).forEach((key) => {
       
      
        if(/^on/.test(key)){
          
          // console.log(key.slice(2), virtualNode.props[key]);
          rootElement.addEventListener(key.slice(2), virtualNode.props[key]);
        } else {
          rootElement.setAttribute(key, virtualNode.props[key]);
        }
      });
      virtualNode.children.map(createElement).forEach((childElement) => {
        rootElement.appendChild(childElement);
      });
      return rootElement;
    }

  const changed = (nodeA, nodeB): boolean => {
      return (
        typeof nodeA !== typeof nodeB ||
        typeof nodeA === 'string' && nodeA !== nodeB ||
        nodeA.type !== nodeB.type ||
        nodeA.props !== nodeB.props
    );
  }

  export const update = ($rootElement: string | HTMLElement, currNode,nextNode, index: number = 0) => {
    let manipulationMapStack = [];
    const updateElement = ($rootElement, currNode, nextNode, index=0) => {
        if (!nextNode) {
          manipulationMapStack.push({
            'parent': $rootElement,
            'method': 'remove',
            'child': $rootElement.childNodes[index],
          })
        } else if (!currNode) {
          manipulationMapStack.push({
            'parent': $rootElement,
            'method': 'append',
            'newChild': createElement(nextNode),
          })
        } else if (changed(currNode, nextNode)) {
          manipulationMapStack.push({
            'parent': $rootElement,
            'method': 'replace',
            'oldChild': $rootElement.childNodes[index],
            'newChild': createElement(nextNode),
          })
        } else if (nextNode.type) {
          for (let i = 0; i < nextNode.children.length || i < currNode.children.length; i++) {
            updateElement(
              $rootElement.childNodes[index], 
              currNode.children[i], 
              nextNode.children[i],
              i
            );
          }
        }
    }
    updateElement($rootElement, currNode, nextNode, index);
    
    // console.log(manipulationMapStack);

    manipulationMapStack.map((manipulation) => {
      switch (manipulation.method){
        case 'remove':{
            manipulation.parent.removeChild(manipulation.child)
            break;
        }
        case 'append':{
            manipulation.parent.appendChild(manipulation.newChild);
            break;
        }
        case 'replace':{
          manipulation.parent.replaceChild(manipulation.newChild,manipulation.oldChild)
          break;
      }
      }
    });
  }
}