import psutil
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import logging

logger = logging.getLogger(__name__)

class ProcessListView(APIView):
    def get(self, request):
        try:
            processes = []
            for proc in psutil.process_iter(['pid', 'name', 'cpu_percent', 'memory_percent', 'create_time', 'username']):
                processes.append(proc.info)
            return Response(processes, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error fetching processes: {e}")
            return Response({"error": "Failed to fetch process details"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ProcessTerminateView(APIView):
    def post(self, request):
        pid = request.data.get('pid')
        if not pid:
            return Response(
                {"error": "PID is required."},
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            pid = int(pid)
            proc = psutil.Process(pid)
            proc.terminate()
            return Response(
                {"message": f"Process {pid} terminated successfully."},
                status=status.HTTP_200_OK
            )
        except psutil.NoSuchProcess:
            logger.error(f"Process {pid} not found.")
            return Response(
                {"error": f"Process with PID {pid} not found."},
                status=status.HTTP_404_NOT_FOUND
            )
        except psutil.AccessDenied:
            logger.error(f"Access denied while trying to terminate process {pid}.")
            return Response(
                {"error": f"Access denied to terminate process {pid}."},
                status=status.HTTP_403_FORBIDDEN
            )
        except Exception as e:
            logger.error(f"Error terminating process {pid}: {e}")
            return Response(
                {"error": f"Failed to terminate process {pid}."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )