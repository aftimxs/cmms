# Generated by Django 4.2.4 on 2023-08-24 16:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_alter_productioninfo_line'),
    ]

    operations = [
        migrations.AlterField(
            model_name='operator',
            name='working_line',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='operator', to='api.productionline'),
        ),
        migrations.AlterField(
            model_name='scrap',
            name='production',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='scrap', to='api.productionline'),
        ),
    ]