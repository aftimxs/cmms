# Generated by Django 4.2.4 on 2023-09-13 21:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Operator',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=30)),
                ('last_name', models.CharField(max_length=30)),
                ('worker_number', models.IntegerField(unique=True)),
            ],
            options={
                'ordering': ['last_name'],
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('part_num', models.CharField(max_length=20, unique=True)),
                ('rate', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='ProductionLine',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('area', models.CharField(max_length=15)),
                ('cell', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Shift',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.IntegerField(choices=[(1, 'First'), (2, 'Second')], default=1)),
                ('date', models.DateField()),
                ('line', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='shift', to='api.productionline')),
                ('operators', models.ManyToManyField(blank=True, to='api.operator')),
            ],
        ),
        migrations.CreateModel(
            name='Scrap',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50, null=True)),
                ('pieces', models.IntegerField()),
                ('comments', models.CharField(max_length=200, null=True)),
                ('production', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='scrap', to='api.productionline')),
            ],
        ),
        migrations.CreateModel(
            name='ProductionInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hour', models.TimeField(null=True)),
                ('minute', models.TimeField()),
                ('item_count', models.IntegerField()),
                ('line', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='info', to='api.productionline')),
                ('shift', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='info', to='api.shift')),
            ],
            options={
                'ordering': ['minute'],
            },
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField()),
                ('line', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='orderL', to='api.productionline')),
                ('products', models.ManyToManyField(to='api.product')),
                ('shift', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='order', to='api.shift')),
            ],
        ),
        migrations.CreateModel(
            name='Machine',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=5, unique=True)),
                ('make', models.CharField(max_length=20)),
                ('machine_model', models.CharField(max_length=20)),
                ('serial', models.IntegerField(unique=True)),
                ('line', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='machine', to='api.productionline')),
            ],
        ),
        migrations.CreateModel(
            name='Downtime',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reason', models.CharField(max_length=50, null=True)),
                ('description', models.CharField(max_length=150, null=True)),
                ('start', models.TimeField()),
                ('end', models.TimeField()),
                ('shift', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='downtime', to='api.shift')),
            ],
            options={
                'ordering': ['start'],
            },
        ),
    ]
