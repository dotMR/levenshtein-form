####Objective
In this task you should create a script, that counts the appearance of any word in a text and its similar.

The workflow should be like that

1. Insert a text into a txt field and execute by pushing a button.

2. Javascript should analyze the text and output a list with a count of words and a list of similarities of that word. The similarities should be excluded from the list and only be listed beside a found word. 
A similarity is given if a word is similar to an already found word by a Levenshtein distance of not more than 1

Word Words Wor word => Word (1) (Words, Wor, word) //"Word" is the first appearance and all other words are similar by levenshtein <= 1
Samson Samso samson => Samson (1) (Samso, samson)

####Usage
compile JSX

    jsx --watch src/ build/


    Count the appearance of any word in the text and determine if any similar words exist.

    Output a list of the distinct words with a count of exact matches as well as list any words similar to it. Similarities are excluded from the list and not counted.

    A word is deemed similar to an already encountered word if the Levenshtein distance between the words is not larger than the value provided (Default 1)

