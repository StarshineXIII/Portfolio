list_one = [1,2,5,6,2]
list_two = [1,2,5,6,2]

list_one = [1,2,5,6,5]
# list_two = [1,2,5,6,5,3]

# list_one = [1,2,5,6,5,16]
# list_two = [1,2,5,6,5]

# list_one = ['celery','carrots','bread','milk']
# list_two = ['celery','carrots','bread','cream']

def compare(partOne, partTwo):
    if list_one == list_two:
        print "Hey woah these r the same."
    elif list_one != list_two:
        print "Hold up, these don't match."

compare(list_one, list_two)