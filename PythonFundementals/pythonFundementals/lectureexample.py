# Lecture Example using Type Lists Assignment

mixed = ['magical unicorns',19,'hello',98.98,'world']
ints = [2,3,1,7,4,12]
strs = ['magical', 'unicorns']

count = 0
number = 0
string = 0
for val in mixed:
    count += 1
    # print 'on line 30'
    print type(val)
    if type(val) is int or type(val) is float:
        print 'val is of number type'
        number += 1
    elif type(val) is str:
        print 'val is str'
        string += 1
print 'the len of the input was:' + str(count)
print 'i found {} numbers in the list.'. format(number)
print 'I found {} strings in the list'. format(string)
# print 'the len of the input was:{}' .format(count)
# print 'the len of the input was:', count

if string and number:
    print 'the list you entered is of mixed type'
elif string:
    print 'The list you entered is of the string type.'
elif number:
    print 'the list you entered is of the number type.'