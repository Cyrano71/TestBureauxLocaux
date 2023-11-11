from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import RealEstate
from django.test import Client
import json

class ViewTestCase(TestCase):
    username = 'jehan'
    password = "1234"
    email = 'jehan@gmail.com'
    c = Client()
    title = "Bureaux privatifs 23 m²"

    def setUp(self):
        user = get_user_model().objects.create_user(self.username, self.email, self.password)
        realstate = RealEstate.create(self.title, 
                              "5 Rue Santeuil, 44000 Nantes", 
                              "rental",
                              "office",
                              "2023-03-16T17:41:28+00:00")
        realstate.save()

    def test_post_login_success(self):
        response = self.c.post("/api/login", json.dumps({"username": self.username, "password": self.password}), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        body_unicode = response.content.decode('utf-8')
        body = json.loads(body_unicode)
        self.assertTrue("token" in body)
        self.assertEqual(len(body["token"]), 228)

    def test_post_login_fails(self):
        wrong_password = self.password + "wrong"
        response = self.c.post("/api/login", json.dumps({"username": self.username, "password": wrong_password}), content_type='application/json')
        self.assertEqual(response.status_code, 401)
        body = response.content.decode('utf-8')
        self.assertEqual(body, "Unauthorized")

    def test_index_success(self):
        response = self.c.post("/api/login", json.dumps({"username": self.username, "password": self.password}), content_type='application/json')
        body_unicode = response.content.decode('utf-8')
        body = json.loads(body_unicode)
        token = body["token"]

        response = self.c.get("/api/", headers={
             "Authorization" : "Bearer " + token
         })
        self.assertEqual(response.status_code, 200)
        body_unicode = response.content.decode('utf-8')
        body = json.loads(body_unicode)
        self.assertEqual(len(body), 1)
        self.assertEqual(body[0]["title"], self.title)

    def test_index_success_fails(self):
        response = self.c.get("/api/", headers={
             "Authorization" : "Bearer " + "fake token"
         })
        self.assertEqual(response.status_code, 401)
        body = response.content.decode('utf-8')
        self.assertEqual(body, "Unauthorized")