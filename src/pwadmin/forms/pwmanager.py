from django import forms



class SignInForm(forms.Form):
    uid = forms.IntegerField(label='uid')
    password = forms.CharField(widget=forms.PasswordInput())
