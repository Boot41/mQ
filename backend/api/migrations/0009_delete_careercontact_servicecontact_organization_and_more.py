from django.db import migrations, models
from django.contrib.postgres.operations import TrigramExtension
from django.contrib.postgres.indexes import GinIndex

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_auto_20240910_1948'),  # Remove the .py extension
    ]

    operations = [
        migrations.DeleteModel(
            name='CareerContact',
        ),
        migrations.AddField(
            model_name='servicecontact',
            name='organization',  # Add this line
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        TrigramExtension(),
        migrations.RunSQL(
            sql='''
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1
                    FROM pg_indexes
                    WHERE indexname = 'title_trigram_index'
                ) THEN
                    CREATE INDEX title_trigram_index ON api_universalcontent USING gin (title gin_trgm_ops);
                END IF;
            END $$;
            ''',
            reverse_sql='DROP INDEX IF EXISTS title_trigram_index;'
        ),
        migrations.RunSQL(
            sql='''
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1
                    FROM pg_indexes
                    WHERE indexname = 'content_trigram_index'
                ) THEN
                    CREATE INDEX content_trigram_index ON api_universalcontent USING gin (content gin_trgm_ops);
                END IF;
            END $$;
            ''',
            reverse_sql='DROP INDEX IF EXISTS content_trigram_index;'
        ),
    ]