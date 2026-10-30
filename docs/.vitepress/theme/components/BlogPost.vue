<template>
  <a :href="href" class="blog-post">
    <div class="blog-post-meta" v-if="date">{{ date }}</div>
    <div class="blog-post-title">{{ title }}</div>
    <div class="blog-post-desc" v-if="description">{{ description }}</div>
  </a>
</template>

<script setup>
defineProps({
  href: String,
  title: String,
  description: String,
  date: String,
})
</script>

<style scoped>
.blog-post {
  display: block;
  margin-top: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.25rem 1.5rem;
  margin-bottom: 1rem;
  background: var(--vp-c-bg-soft);
  text-decoration: none;
  transition: border-color 0.2s, background 0.2s;
}

.blog-post:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-elv);
}

.blog-post-meta {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.4rem;
}

.blog-post-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.4rem;
}

.blog-post-desc {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
</style>
