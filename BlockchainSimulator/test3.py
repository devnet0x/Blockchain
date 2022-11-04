#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Jun 13 12:02:37 2021

@author: jnavon
"""

class Person:
  def __init__(self, name, age):
    self.name = name
    self.age = age

  def describe(self):
    print("Hello my name is " + self.name + " and I am " + str(self.age) + " years old")
    print(f'Hello my name is {self.name} and I am {str(self.age)} years old')

p1 = Person("John", 36)
p2 = Person("Jaime", 55)
p1.describe()
p2.describe()
