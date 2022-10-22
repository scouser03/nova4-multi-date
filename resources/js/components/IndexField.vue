<template>
    <span>
        <template v-if="field.value">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-70"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        </template>
        <template v-else>-</template>
    </span>
</template>

<script>
export default {
    props: ["resourceName", "field"],
};
</script>
