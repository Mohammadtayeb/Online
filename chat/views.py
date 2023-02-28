from django.shortcuts import render, HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.contrib import messages
from datetime import datetime
# Create your views here.


def index(request):
    # Check if the user submits his/her name. If yes redirect to the chating page, else to index page
    if request.method == 'POST':
        # Access to the name of user
        name = request.POST['name']
        # Store it in session
        request.session['user'] = name
        return HttpResponseRedirect(reverse('chating'))
    else:
        return render(request, 'chat/index.html')

def chating(request):
    # If the user submits his/her name, then it should be in session. Otherwise, the chating page should not be accessable
    try:
        request.session['user']
        # Delete the session
        name = request.session.pop('user')
        # By accessing the current time, we append it to the user's name; to prevent from name matching between users name
        current_time = datetime.now()
        # Change to string
        now = str(current_time)
        # Append it to the name
        name_with_time = name + "/%/" + now
        return render(request, 'chat/chating.html', {
            'name': name_with_time
        })
    except KeyError: # Otherwise rais an error. Render the user to index page
        messages.error(request, 'For online chating, please enter your namae first!')
        return HttpResponseRedirect(reverse('index'))