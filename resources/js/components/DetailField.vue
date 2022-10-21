<template>
    <default-field
        :field="field"
        :errors="errors"
        :show-help-text="showHelpText"
    >
        <template slot="field">
            <div class="flex flex-col">
                <div v-for="(date, index) in multi_date">
                    <div class="flex items-center mt-2">
                        <div class="flex items-center">
                            <label class="bg-white mx-2 text-80 rounded-lg"
                                >From:</label
                            >
                            <date-time-picker
                                :placeholder="date.from_date"
                                class="from-control w-full"
                                :value="date.from_date"
                                :index="index"
                                name="from_date"
                                @change="setDate"
                            >
                            </date-time-picker>
                        </div>
                        <div class="flex items-center">
                            <label class="bg-white mx-2 text-80 rounded-lg"
                                >to:</label
                            >
                            <date-time-picker
                                class="ml-1 from-control w-full"
                                :placeholder="date.to_date"
                                :value="date.to_date"
                                :index="index"
                                name="to_date"
                                @change="setDate"
                            >
                            </date-time-picker>
                        </div>
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
                    @click="addDateRow"
                    type="button"
                    class="mt-2 btn btn-default btn-primary text-sm"
                >
                    Add
                </button>
            </div>
        </template>
    </default-field>
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
        console.log("here");
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
            var newDates = this.multi_date.find(
                (date, index) => index == e.index
            );
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
            this.multi_date.push(this.currentDate());
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
