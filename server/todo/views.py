from rest_framework.views import APIView
from rest_framework.response import Response


class TodoView(APIView):
    def get(self, request):
        return Response({"message": "Hello, world! i am from get method"})

    def post(self, request):
        return Response({"message": "Hello, world! i am from post method"})
