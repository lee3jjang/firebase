import firebase_admin
from firebase_admin import credentials, db

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://planar-cell-314516-default-rtdb.asia-southeast1.firebasedatabase.app/'
})

ref = db.reference('py/')
users_ref = ref.child('users')

# save data
users_ref.set({
    'alanisawesome': {
        'date_of_birth': 'June 23, 1912',
        'full_name': 'Alan Turing',
    },
    'gracehop': {
        'date_of_birth': 'December 9, 1906',
        'full_name': 'Grace Hopper',
    },
})

# update data
hopper_ref = users_ref.child('gracehop')
hopper_ref.update({
    'nickname': 'Amazing Grace'
})

# read data
alanisawesome = db.reference('py/users/alanisawesome')

print(alanisawesome.get())