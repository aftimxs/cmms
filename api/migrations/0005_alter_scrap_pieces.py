# Generated by Django 4.2.4 on 2023-09-21 17:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_rename_title_scrap_reason_remove_scrap_production_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='scrap',
            name='pieces',
            field=models.IntegerField(null=True),
        ),
    ]
