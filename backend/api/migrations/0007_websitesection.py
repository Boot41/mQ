# Generated by Django 5.1 on 2024-09-05 10:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_careercontact_table_alter_servicecontact_table'),
    ]

    operations = [
        migrations.CreateModel(
            name='WebsiteSection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('section_id', models.CharField(max_length=100, unique=True)),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('content', models.TextField()),
                ('additional_info', models.JSONField(blank=True, default=dict, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'indexes': [models.Index(fields=['section_id'], name='api_website_section_d0ae13_idx'), models.Index(fields=['title'], name='api_website_title_ec6d15_idx'), models.Index(fields=['is_active'], name='api_website_is_acti_3a7048_idx')],
            },
        ),
    ]
