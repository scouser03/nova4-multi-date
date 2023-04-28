<template>
    <input
        class="w-full form-control form-input form-input-bordered"
        :value="value"
        ref="datePicker"
        type="text"
        :placeholder="placeholder"
    />
</template>

<script>
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import "flatpickr/dist/themes/airbnb.css";
export default {
    props: {
        value: {
            required: false,
        },
        placeholder: {
            type: String,
        },
        name: {
            type: String,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
        hourIncrement: {
            type: Number,
            default: 1,
        },
        minuteIncrement: {
            type: Number,
            default: 5,
        },
        dateFormat: {
            type: String,
            default: "Y-m-d H:i:S",
        },
        altFormat: {
            type: String,
            default: "Y-m-d H:i:S",
        },
        twelveHourTime: {
            type: Boolean,
            default: false,
        },
        enableTime: {
            type: Boolean,
            default: true,
        },
        enableSeconds: {
            type: Boolean,
            default: true,
        },
        firstDayOfWeek: {
            type: Number,
            default: 0,
        },
    },
    data: () => ({
        flatpickr: null,
    }),
    watch: {
        value: function (newValue, oldValue) {
            if (this.flatpickr) {
                console.log("here watch");
                this.flatpickr.setDate(newValue);
            }
        },
    },
    created() {
        this.$nextTick(() => this.createFlatpickr());
    },
    methods: {
        createFlatpickr() {
            this.flatpickr = flatpickr(this.$refs.datePicker, {
                enableTime: this.enableTime,
                enableSeconds: this.enableSeconds,
                onOpen: this.onOpen,
                onClose: this.onClose,
                onChange: this.onChange,
                dateFormat: this.dateFormat,
                altInput: true,
                altFormat: this.altFormat,
                allowInput: true,
                // static: true,
                time_24hr: !this.twelveHourTime,
                hourIncrement: this.hourIncrement,
                minuteIncrement: this.minuteIncrement,
                locale: { firstDayOfWeek: this.firstDayOfWeek },
            });

            this.flatpickr.setDate(this.value);
        },
        onOpen(event) {
            Nova.$emit("datepicker-opened", event);
        },
        onClose(event) {
            this.onChange(event);
            Nova.$emit("datepicker-closed", event);
        },
        onChange(event) {
            this.$emit("change", {
                value:
                    this.$refs.datePicker.value == ""
                        ? this.value
                        : this.$refs.datePicker.value,
                name: this.name,
                index: this.index,
            });
        },
        clear() {
            this.flatpickr.clear();
        },
    },
    beforeDestroy() {
        this.flatpickr.destroy();
    },
};
</script>

<style scoped>
.\!cursor-not-allowed {
    cursor: not-allowed !important;
}
</style>
