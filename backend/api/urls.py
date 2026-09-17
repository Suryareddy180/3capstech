from django.urls import path
from . import views

urlpatterns = [
    path("", views.api_root),
    path("config", views.api_brand_config),
    path("config/", views.api_brand_config),
    path("stats", views.api_stats),
    path("stats/", views.api_stats),
    path("contact", views.api_contact),
    path("contact/", views.api_contact),
    path("newsletter", views.api_newsletter),
    path("newsletter/", views.api_newsletter),
    path("enroll", views.api_enroll),
    path("enroll/", views.api_enroll),
    path("services", views.api_services),
    path("services/", views.api_services),
    path("products", views.api_products),
    path("products/", views.api_products),
    path("testimonials", views.api_testimonials),
    path("testimonials/", views.api_testimonials),
    path("engagement", views.api_engagement),
    path("engagement/", views.api_engagement),
    path("guidance", views.api_guidance),
    path("guidance/", views.api_guidance),
    path("leaders", views.api_leaders),
    path("leaders/", views.api_leaders),
    path("solutions", views.api_solutions),
    path("solutions/", views.api_solutions),
]

from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import include

router = DefaultRouter(trailing_slash=False)
router.register(r'admin/products', views.ProductViewSet, basename='admin-products')
router.register(r'admin/services', views.ServiceViewSet, basename='admin-services')
router.register(r'admin/testimonials', views.TestimonialViewSet, basename='admin-testimonials')
router.register(r'admin/leaders', views.LeaderProfileViewSet, basename='admin-leaders')
router.register(r'admin/solutions', views.EnterpriseSolutionViewSet, basename='admin-solutions')
router.register(r'admin/contacts', views.ContactViewSet, basename='admin-contacts')


urlpatterns += [
    path("admin/login", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("admin/login/", TokenObtainPairView.as_view(), name="token_obtain_pair_slash"),
    path("admin/refresh", TokenRefreshView.as_view(), name="token_refresh"),
    path("admin/refresh/", TokenRefreshView.as_view(), name="token_refresh_slash"),
    path("", include(router.urls)),
]
