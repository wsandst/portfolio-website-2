---
title: "Sorting Algorithms with One Line of Python"
cover: "./python-one-liners-cover.png"
date: "2020-03-02"
slug: "sorting-algorithms-in-one-line-of-python"
tags:
    - python
    - one-liners
    - sorting
    - blog
---
This post is dedicated to several Python one-liners for different Sorting Algorithms, written by me and my friend Harald Bjurulf. 
Most problems are generally solveable in one line with Python, especially if you use the walrus operator or itertools, and sorting is no exception.  

It is worth to mention that you should in no scenario use any of these in actual code. Long one liners are in general just a bad idea. They are fun to write though.  

The first three sorting algoritms below are quite easy to implement as one liners. After that they become increasingly complicated.  

**Quick sort:** 
```python
def quick_sort(v):
    return v[:] if len(v) < 2 else 
        quick_sort([x for x in v if x < v[0]]) + 
        [x for x in v if x==v[0]] + 
        quick_sort([x for x in v if x > v[0]])
```

**Selection sort:**  
```python
def selection_sort(v: list):
    return [v.pop(v.index(min(v))) for _i in range(len(v))]
```

**Counting sort:**  
```python
def counting_sort(v: list):
    return sum([[i] * v.count(i) for i in range(0, max(v)+1)], [])
```

**Bubble sort:**
```python
def bubble_sort(lst):
    (lst.append(None), 
        [[(lst.__setitem__(len(lst)-1, lst[i]), 
            lst.__setitem__(i, lst[i+1]), 
            lst.__setitem__(i+1, lst[len(lst)-1]))
        for i in range(len(lst)-2) if lst[i] > lst[i+1]] 
        for j in lst],
        lst.pop(len(lst)-1))
```

**Insertion sort:**
```python
def insertion_sort(v):
    return (sort:=lambda v, 
        i: sort((insrt:=lambda v, 
        i: (lm:=lambda x, i, 
        val: [val] if i < 0 
        else lm(x, i - 1, val) + [x[i]] if x[i] > val 
        else x[:i + 1] + [val])(v, i - 1, v[i]) + v[i+1:])(v, i), i + 1) 
        if i < len(v) else v[:])(v, 0)
```

**Merge sort:**
```python
def merge_sort(lst):
    return (lambda lst1, lst2: list(reversed([
        lst1.pop()
        if len(lst1) != 0 and (len(lst2) == 0 or
        lst1[-1] >= lst2[-1]) else 
        lst2.pop()
        for i in range(len(lst1) + len(lst2))]))
        )(merge_sort(lst[:len(lst)//2]), merge_sort(lst[len(lst)//2:])) 
        if len(lst) > 1 else lst[:]
```

**Radix LSD sort:**  
```python
def _radix_sort(v: list, mx: int, digit):
    return v if digit > mx 
        else _radix_sort([val for val in v 
        if not (val // digit) % 2] + [val for val in v 
        if (val // digit) % 2], mx, digit * 2)

def radix_sort(v: list):
    return _radix_sort(v, max(v), 1)
```