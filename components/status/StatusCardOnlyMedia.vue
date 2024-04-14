<script setup lang="ts">
import type { mastodon } from 'masto'

const props = withDefaults(
  defineProps<{
    status: mastodon.v1.Status
    actions?: boolean
    context?: mastodon.v2.FilterContext
    hover?: boolean
    inNotification?: boolean
    isPreview?: boolean

    // If we know the prev and next status in the timeline, we can simplify the card
    older?: mastodon.v1.Status
    newer?: mastodon.v1.Status
    // Manual overrides
    hasOlder?: boolean
    hasNewer?: boolean

    // When looking into a detailed view of a post, we can simplify the replying badges
    // to the main expanded post
    main?: mastodon.v1.Status
  }>(),
  { actions: true },
)

const status = computed(() => {
  if (props.status.reblog && (!props.status.content || props.status.content === props.status.reblog.content))
    return props.status.reblog
  return props.status
})

const isDM = computed(() => status.value.visibility === 'direct')
</script>

<template>
  <StatusMediaWithoutContainer
    :status="status"
    :newer="newer"
    :context="context"
    :is-preview="isPreview"
    :in-notification="inNotification"
    mb2 :class="{ 'mt-2 mb1': isDM }"
  />
</template>
