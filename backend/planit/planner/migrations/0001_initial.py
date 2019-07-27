# Generated by Django 2.2.3 on 2019-07-27 15:16

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Plan',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Term',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=5)),
                ('plan', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='terms', to='planner.Plan')),
            ],
            options={
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='PlannerCourse',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('index', models.IntegerField()),
                ('course', models.CharField(max_length=9)),
                ('term', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='courses', to='planner.Term')),
            ],
            options={
                'ordering': ['index'],
            },
        ),
    ]