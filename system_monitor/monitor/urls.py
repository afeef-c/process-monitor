from django.urls import path
from .views import ProcessListView,ProcessTerminateView

urlpatterns = [
    path('processes/', ProcessListView.as_view(), name='process-list'),
    path('terminate/', ProcessTerminateView.as_view(), name='process-terminate'),

]
