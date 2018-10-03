# input
word_list = ['hello','world','my','name','is','Anna']
char = 'o'
# output
# new_list = ['hello','world']
new_list = []

for value in word_list:
    # print word_list
    if char in value:
        # print value
        new_list.append(value)
print new_list