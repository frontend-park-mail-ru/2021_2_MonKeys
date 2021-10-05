package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gorilla/mux"
)

type spaHandler struct {
	staticPath string
	indexPath  string
}

func (h spaHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// setupResponse(&w, r)
	// if (*r).Method == "OPTIONS" {
	// 	return
	// }

	// get the absolute path to prevent directory traversal
	path, err := filepath.Abs(r.URL.Path)
	if err != nil {
		// if we failed to get the absolute path respond with a 400 bad request
		// and stop
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// prepend the path with the path to the static directory
	path = filepath.Join(h.staticPath, path)

	// check whether a file exists at the given path
	_, err = os.Stat(path)
	if os.IsNotExist(err) {
		// file does not exist, serve index.html
		http.ServeFile(w, r, filepath.Join(h.staticPath, h.indexPath))
		return
	} else if err != nil {
		// if we got an error (that wasn't that the file doesn't exist) stating the
		// file, return a 500 internal server error and stop
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// otherwise, use http.FileServer to serve the static dir
	http.FileServer(http.Dir(h.staticPath)).ServeHTTP(w, r)
}

func main() {
	port := flag.String("p", ":443", "server port")
	ssl := flag.Bool("ssl", true, "HTTPS/HTTP")
	flag.Parse()

	mux := mux.NewRouter()

	spa := spaHandler{staticPath: "static", indexPath: "index.html"}
	mux.PathPrefix("/").Handler(spa)

	srv := &http.Server{
		Handler:      mux,
		Addr:         *port,
		WriteTimeout: http.DefaultClient.Timeout,
		ReadTimeout:  http.DefaultClient.Timeout,
	}
	fmt.Printf("Running server at port %v ssl=%t", *port, *ssl)
	// log.Fatal(srv.ListenAndServe())
	if *ssl {
		log.Fatal(srv.ListenAndServeTLS("ijia.me.crt", "ijia.me.key"))
	} else {
		srv.ListenAndServe()
	}
}
