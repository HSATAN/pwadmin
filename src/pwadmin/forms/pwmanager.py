from django import forms



class SignInForm(forms.Form):
    uid = forms.CharField(label='uid', max_length=15)
    password = forms.CharField(widget=forms.PasswordInput())
