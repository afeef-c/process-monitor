from django.urls import path
from .views import ProcessListView,ProcessTerminateView,system_summary

urlpatterns = [
    path('processes/', ProcessListView.as_view(), name='process-list'),
    path('terminate/', ProcessTerminateView.as_view(), name='process-terminate'),
    path("system-summary/", system_summary, name="system_summary"),

]
