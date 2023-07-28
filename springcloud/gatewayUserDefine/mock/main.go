package main

import (
	"net/http"
)

func main() {
	http.HandleFunc("/get1", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte("Hello Fish1"))
	})

	http.HandleFunc("/get2", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte("Hello Fish2"))
	})

	http.HandleFunc("/get3", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte("Hello Fish3"))
	})

	http.HandleFunc("/get4", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte("Hello Fish4"))
	})


	http.ListenAndServe(":9199", nil)
}
