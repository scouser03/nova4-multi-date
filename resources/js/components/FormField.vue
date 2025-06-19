<template>
    <DefaultField
        :field="field"
        :errors="errors"
        :show-help-text="showHelpText"
        :full-width-content="fullWidthContent"
    >
        <template #field>
            <div class="flex flex-col">
                <div v-for="(date, index) in multi_date">
                    <div class="flex items-center mt-2 justify-between">
                        <div class="flex items-center justify-between">
                            <label class="inline-block pt-2 leading-tight"
                                >From:</label
                            >
                            <date-time-picker
                                :placeholder="date.from_date"
                                class="from-control from-input w-full mx-2"
                                :value="date.from_date"
                                :disabled="field.readonly"
                                :index="index"
                                name="from_date"
                                @change="setDate"
                            >
                            </date-time-picker>
                        </div>
                        <div class="flex items-center">
                            <label class="inline-block mx-2 pt-2 leading-tight"
                                >To:</label
                            >
                            <date-time-picker
                                class="ml-1 from-control w-full"
                                :disabled="field.readonly"
                                :placeholder="date.to_date"
                                :value="date.to_date"
                                :index="index"
                                name="to_date"
                                @change="setDate"
                            >
                            </date-time-picker>
                        </div>
                        <button
                            :disabled="field.readonly"
                            @click="destroy(index)"
                            type="button"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"></path></svg>
                        </button>
                    </div>
                    <span
                        v-show="customErrors[index]"
                        class="help-text mt-2 help-text-error"
                    >
                        The from date must be less than the to date, if you want
                        to save it, change it! Otherwise it will skip
                        automatically!
                    </span>
                </div>
                <button
                    :disabled="field.readonly"
                    @click="addDateRow"
                    type="button"
                    class="mt-2 shadow relative bg-primary-500 hover:bg-primary-400 text-white dark:text-gray-900 cursor-pointer rounded text-sm font-bold focus:outline-none focus:ring ring-primary-200 dark:ring-gray-600 inline-flex items-center justify-center h-9 px-3 shadow relative bg-primary-500 hover:bg-primary-400 text-white dark:text-gray-900"
                >
                    Add
                </button>
            </div>
        </template>
    </DefaultField>
</template>

<script>
import { FormField, HandlesValidationErrors } from "laravel-nova";
import DateTimePicker from "./DateTimePicker.vue";

export default {
    mixins: [FormField, HandlesValidationErrors],

    props: ["resourceName", "resourceId", "field"],
    components: {
        DateTimePicker,
    },

    data() {
        return {
            multi_date: [],
            customErrors: [],
        };
    },
    mounted() {
        if (this.value) {
            this.multi_date = JSON.parse(this.value);
        } else {
            this.multi_date = [this.currentDate()];
        }
    },

    methods: {
        /*
         * Set the initial, internal value for the field.
         */
        setInitialValue() {
            this.value = this.field.value || "";
        },
        setDate(e) {
            // var newDates = this.multi_date.find(
            //     (date, index) => index == e.index
            // );
            var newDates = this.multi_date.find((date, index) => {
                return index == e.index;
            });

            if (newDates === undefined) {
                return;
            }

            newDates[e.name] = e.value;

            if (e.name == "to_date") {
                if (newDates["from_date"] > newDates["to_date"]) {
                    this.customErrors[e.index] = e.index.toString();
                } else {
                    this.customErrors = this.customErrors.filter(
                        (item) => item !== e.index.toString()
                    );
                }
            }
        },
        /**
         * Fill the given FormData object with the field's internal value.
         */
        fill(formData) {
            var formatData = this.multi_date;

            var formatData = this.multi_date.filter((date) => {
                return (
                    (date.from_date != "-" || date.to_date != "-") &&
                    date.from_date < date.to_date
                );
            });
            formatData = JSON.stringify(formatData);

            if (formatData == "[]") {
                formatData = "";
            }
            formData.append(this.field.attribute, formatData || "");
        },
        addDateRow() {
            if (!this.field.readonly) {
                this.multi_date.push(this.currentDate());
            }
        },

        destroy(index) {
            if (this.multi_date.length > 1 || !this.field.readonly) {
                this.multi_date = this.multi_date.filter(
                    (item, key) => index !== key
                );
            }
        },

        currentDate() {
            return {
                from_date: "-",
                to_date: "-",
            };
        },
    },
};
</script>
