from django.contrib import admin
from .models import Contact, Newsletter, Enrollment, Product, Service, Testimonial, WebsiteSetting, LeaderProfile, EnterpriseSolution

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'company', 'interest', 'created_at')
    list_filter = ('interest', 'created_at')
    search_fields = ('name', 'email', 'company')
    readonly_fields = ('created_at',)

@admin.register(Newsletter)
class NewsletterAdmin(admin.ModelAdmin):
    list_display = ('email', 'created_at')
    search_fields = ('email',)
    readonly_fields = ('created_at',)

@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'course_id', 'created_at')
    list_filter = ('course_id', 'created_at')
    search_fields = ('name', 'email', 'course_id')
    readonly_fields = ('created_at',)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'product_id', 'is_active', 'created_at')
    list_filter = ('is_active', 'created_at')
    search_fields = ('title', 'product_id', 'desc')

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'service_id', 'is_active', 'created_at')
    list_filter = ('is_active', 'created_at')
    search_fields = ('title', 'service_id', 'desc')

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'is_active', 'created_at')
    list_filter = ('is_active', 'created_at')
    search_fields = ('name', 'role', 'text')

@admin.register(WebsiteSetting)
class WebsiteSettingAdmin(admin.ModelAdmin):
    list_display = ('key', 'updated_at')
    search_fields = ('key', 'value')
    readonly_fields = ('updated_at',)

@admin.register(LeaderProfile)
class LeaderProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'title', 'is_active', 'display_order', 'updated_at')
    list_editable = ('is_active', 'display_order')
    list_filter = ('is_active',)
    search_fields = ('name', 'title')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        (None, {
            'fields': ('name', 'title', 'bio', 'photo')
        }),
        ('Social Links', {
            'fields': ('linkedin', 'twitter', 'email'),
            'classes': ('collapse',),
        }),
        ('Display Settings', {
            'fields': ('is_active', 'display_order'),
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',),
        }),
    )

@admin.register(EnterpriseSolution)
class EnterpriseSolutionAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'display_order', 'is_active', 'updated_at')
    list_editable = ('display_order', 'is_active')
    list_filter = ('category', 'is_active')
    search_fields = ('name', 'category', 'desc')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        (None, {
            'fields': ('name', 'category', 'desc')
        }),
        ('Display Settings', {
            'fields': ('is_active', 'display_order'),
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',),
        }),
    )
