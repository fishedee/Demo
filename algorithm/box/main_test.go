package main

import (
	. "github.com/fishedee/assert"
	"testing"
)

func TestFindSum1(t *testing.T) {
	result := findSum([]int{2000, 1500, 1000, 2000, 1000}, 6000)
	AssertEqual(t, result, map[int]map[string]bool{
		2000: map[string]bool{
			"2000":      true,
			"1000_1000": true,
		},
		1500: map[string]bool{
			"1500": true,
		},
		1000: map[string]bool{
			"1000": true,
		},
		5000: map[string]bool{
			"2000_2000_1000": true,
		},
		6000: map[string]bool{
			"2000_2000_1000_1000": true,
		},
		4000: map[string]bool{
			"2000_2000":      true,
			"2000_1000_1000": true,
		},
		3500: map[string]bool{
			"2000_1500":      true,
			"1500_1000_1000": true,
		},
		5500: map[string]bool{
			"2000_2000_1500":      true,
			"2000_1500_1000_1000": true,
		},
		4500: map[string]bool{
			"2000_1500_1000": true,
		},
		3000: map[string]bool{
			"2000_1000": true,
		},
		2500: map[string]bool{
			"1500_1000": true,
		},
	})
}

func TestFindSum2(t *testing.T) {
	result := findSum([]int{2000, 1100, 2200, 2000, 2000}, 6000)
	AssertEqual(t, result, map[int]map[string]bool{
		2200: map[string]bool{
			"2200": true,
		},
		4200: map[string]bool{
			"2200_2000": true,
		},
		4000: map[string]bool{
			"2000_2000": true,
		},
		1100: map[string]bool{
			"1100": true,
		},
		3100: map[string]bool{
			"2000_1100": true,
		},
		5100: map[string]bool{
			"2000_2000_1100": true,
		},
		2000: map[string]bool{
			"2000": true,
		},
		6000: map[string]bool{
			"2000_2000_2000": true,
		},
		3300: map[string]bool{
			"2200_1100": true,
		},
		5300: map[string]bool{
			"2200_2000_1100": true,
		},
	})
}

func Test1(t *testing.T) {
	result := Solve(Condition{
		MaxSum: 6000,
		Data:   []int{4000, 2700, 1900},
	})
	AssertEqual(t, result, Result{
		Steps: []ResultStep{
			{Data: []int{4000, 1900}},
			{Data: []int{2700}},
		},
	})
}

func Test2(t *testing.T) {
	result := Solve(Condition{
		MaxSum: 6000,
		Data:   []int{2000, 1100, 2200, 2000, 2000},
	})
	AssertEqual(t, result, Result{
		Steps: []ResultStep{
			{Data: []int{2000, 2000, 2000}},
			{Data: []int{2200, 1100}},
		},
	})
}

func Test3(t *testing.T) {
	result := Solve(Condition{
		MaxSum: 6000,
		Data:   []int{1500, 1700, 1100, 1500, 1100, 5000},
	})
	AssertEqual(t, result, Result{
		Steps: []ResultStep{
			{Data: []int{1700, 1500, 1500, 1100}},
			{Data: []int{5000}},
			{Data: []int{1100}},
		},
	})
}
