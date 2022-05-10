

Music Online – Testing

Diego Rincon





Contents

Credentials ........................................................................................................................................................................3

Log in.................................................................................................................................................................................4

Empty fields...................................................................................................................................................................4

Wrong input..................................................................................................................................................................4

Incorrect email..............................................................................................................................................................5

Incorrect password .......................................................................................................................................................5

Sign up...............................................................................................................................................................................6

Empty fields...................................................................................................................................................................6

Wrong input..................................................................................................................................................................6

Email in use ...................................................................................................................................................................7

User navigation bar...........................................................................................................................................................7

HOME............................................................................................................................................................................7

STORE............................................................................................................................................................................8

Buy product...............................................................................................................................................................8

SELLING .........................................................................................................................................................................9

Add new item to sell ...............................................................................................................................................10

Delete selling item ..................................................................................................................................................10

View item info.........................................................................................................................................................11

Edit selling item.......................................................................................................................................................12

PURCHASE...................................................................................................................................................................12

View purchased item ..............................................................................................................................................13

PROFILE .......................................................................................................................................................................13

LOG OUT......................................................................................................................................................................14

Admin navigation bar......................................................................................................................................................14

Dashboard...................................................................................................................................................................14

USERS ..........................................................................................................................................................................14

Display user’s information ......................................................................................................................................15

VINYLS .........................................................................................................................................................................15

Display vinyl’s information......................................................................................................................................16

ORDERS .......................................................................................................................................................................16

LOG OUT......................................................................................................................................................................17

Search bars......................................................................................................................................................................17

Store search bar..........................................................................................................................................................17

User search bar ...........................................................................................................................................................17

Vinyls search bar .........................................................................................................................................................18

Testing log.......................................................................................................................................................................19

2





Credentials

Admin

Email

dr@gmail.com

Password 123456789

Password 123456789

Password 123456789

Password 123456789

Admin

Email

as@gmail.com

dc@gmail.com

ad@gmail.com

User

Email

User

Email

3





Log in

Empty fields

Wrong input

4





Incorrect email

Incorrect password

5





Sign up

Empty fields

Wrong input

6





Email in use

User navigation bar

HOME

On click – Display home section

7





STORE

On click – Load data from data base, Display store section

Buy product

On click – Display modal with item information and option to buy

8





SELLING

On click – Load data from data base, Display selling section

9





Add new item to sell

On click – Display form to add a new selling item

Delete selling item

On click – Ask user to confirm deletion of item

10





View item info

On click – Display modal with item information

11





Edit selling item

On click – Display modal form with the item information

PURCHASE

On click – Load data from data base, Display purchase section

12





View purchased item

On click – Load data from data base, Display order information

PROFILE

On click – Load data from data base, Display profile page

13





LOG OUT

On click – Destroy session, Display log in page

Admin navigation bar

Dashboard

On click – Load data from data base, Display dashboard section

USERS

On click – Load data from data base, Display users’ section

14





Display user’s information

VINYLS

On click – Load data from data base, Display items section

15





Display vinyl’s information

ORDERS

On click – Load data from data base, Display orders section

16





LOG OUT

On click – Destroy session, Display log in page

Search bars

Store search bar

User search bar

17





Vinyls search bar

18






Pop - the golden organizer

Test Log

\#

**Item being tested**

**Test case**

**Test data**

**Expected result**

**Actual result**

**Comments**

1 Web page load

load

load

load successfully

error msg

error msg

error msg

log in

As expected

As expected

As expected

As expected

As expected

As expected

2 login input [email]

3 login input [email]

4 login input [email]

5 login input [email]

6 login input [password]

missing @

dgmail.com

d@gmail.m

d@gmail.com

dr@gmail.com

123

no valid email

non-existent mail

valid email

short password

error msg

1234567891234567891234567

8912345678912345678912345

7 login input [password]

long password

error msg

As expected

8 login input [password]

9 login input [password]

10 register input [name]

11 register input [email]

12 register input [email]

13 register input [email]

14 register input [email]

15 register input [password 1]

no valid password

valid password

any input

1234567890

123456789

Diego.7 - >

dgmail.com

d@gmail.m

d@gmail.com

dr@gmail.com

123

error msg

log in

As expected

As expected

As expected

As expected

As expected

As expected

As expected

As expected

accepted

missing @

error msg

error msg

error msg

create account

error msg

no valid email

non-existent mail

valid email

short password

1234567891234567891234567

8912345678912345678912345

16 register input [password 1]

long password

error msg

As expected

17 register input [password 1]

18 register input [password 1]

no valid password

valid password

1234567890

123456789

error msg

As expected

As expected

create account

different password from

password 1

19 register input [password 2]

20 register input [password 2]

12345678

error msg

As expected

As expected

equal password as

password 1

123456789

create account

21 register input check box

22 register input check box

23 register and log in buttons

uncheked

cheked

click

uncheked

cheked

click

error msg

As expected

As expected

As expected

create account

send data to check





Pop - the golden organizer

Test Log

\#

**Item being tested**

**Test case**

**Test data**

**Expected result**

**Actual result**

**Comments**

24 User nav bar

25 User nav bar

26 User nav bar

click **store**

click **selling**

click **purchase**

click

click

click

load store page

load selling page

load purchase page

As expected

As expected

As expected

27 User nav bar

28 Admin nav bar

29 Admin nav bar

click **profile**

click **dashboard**

click **users**

click

click

click

load profile page

load dashboard page

load users table

As expected

As expected

As expected

30 Admin nav bar

31 Admin nav bar

32 delete item

33 view item

click **vinyls**

click **orders**

click delete

click view

click

click

click

click

load vinyls table

load orders table

As expected

As expected

As expected

As expected

delete item from

data base

display information

of clicked item

display information

of clicked item and

allow to edit

34 edit item

click edit

click

As expected

information

display all user

information and

allow to edit

35 edit user information

36 edit item information

37 log out

click edit user

click edit item

click

click

As expected

As expected

display all item

information and

allow to edit

destroy session on

breowser and take

user to login page

click log out button

search

click

a

As expected

As expected

display all items

with a letter a

38 Search bars

39

