sI = 45
mI = 100
bI = 455
eI = 0
spI = -23
sS = "Rubber baby buggy bumpers"
mS = "Experience is simply the name we give our mistakes"
bS = "Tell me and I forget. Teach me and I remember. Involve me and I learn."
eS = ""
aL = [1,7,4,21]
mL = [3,5,7,34,3,2,113,65,8,89]
lL = [4,34,22,68,9,13,3,5,7,9,2,12,45,923]
eL = []
spL = ['name','address','phone number','social security number']

if sI >= 100:
    print sI
    print "That's a biggun'"
elif sI < 100:
    print sI
    print "smol"

if len(sS) >= 50:
    print len(sS)
    print "tldr"
elif len(sS) < 50:
    print len(sS)
    print "'Yeah, I like to read...'"

for i in range(len(lL)):
    print i
if i >= 10:
    print "this list too long"
elif i < 10:
    print "this list so short"