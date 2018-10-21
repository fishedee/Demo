package main

import (
	. "github.com/fishedee/assert"
	"testing"
)

func Test1(t *testing.T) {
	result := Solve(Condition{
		TotalWeight: 30,
		Items: []ConditionItem{
			{15, 12},
			{10, 8},
			{12, 9},
			{8, 5},
		},
	})

	AssertEqual(t, result, Result{
		TotalValue: 22,
		Items: []ResultItem{
			{1},
			{2},
			{3},
		},
	})
}

func Test2(t *testing.T) {
	result := Solve(Condition{
		TotalWeight: 12,
		Items: []ConditionItem{
			{4, 8},
			{6, 10},
			{2, 6},
			{2, 3},
			{5, 7},
			{1, 2},
		},
	})

	AssertEqual(t, result, Result{
		TotalValue: 24,
		Items: []ResultItem{
			{0},
			{1},
			{2},
		},
	})
}
