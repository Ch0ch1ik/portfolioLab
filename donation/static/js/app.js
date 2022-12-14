document.addEventListener("DOMContentLoaded", function () {




    /**
     * HomePage - Help section
     */
    class Help {
        constructor($el) {
            this.$el = $el;
            this.$buttonsContainer = $el.querySelector(".help--buttons");
            this.$slidesContainers = $el.querySelectorAll(".help--slides");
            this.currentSlide = this.$buttonsContainer.querySelector(".active").parentElement.dataset.id;
            this.init();
        }

        init() {
            this.events();
        }

        events() {
            /**
             * Slide buttons
             */
            this.$buttonsContainer.addEventListener("click", e => {
                if (e.target.classList.contains("btn")) {
                    this.changeSlide(e);
                }
            });

            /**
             * Pagination buttons
             */
            this.$el.addEventListener("click", e => {
                if (e.target.classList.contains("btn") && e.target.parentElement.parentElement.classList.contains("help--slides-pagination")) {
                    this.changePage(e);
                }
            });
        }

        changeSlide(e) {
            e.preventDefault();
            const $btn = e.target;

            // Buttons Active class change
            [...this.$buttonsContainer.children].forEach(btn => btn.firstElementChild.classList.remove("active"));
            $btn.classList.add("active");

            // Current slide
            this.currentSlide = $btn.parentElement.dataset.id;

            // Slides active class change
            this.$slidesContainers.forEach(el => {
                el.classList.remove("active");

                if (el.dataset.id === this.currentSlide) {
                    el.classList.add("active");
                }
            });
        }

        /**
         * TODO: callback to page change event
         */
        changePage(e) {
            e.preventDefault();
            const page = e.target.dataset.page;

            console.log(page);
        }
    }

    const helpSection = document.querySelector(".help");
    if (helpSection !== null) {
        new Help(helpSection);
    }

    /**
     * Form Select
     */
    class FormSelect {
        constructor($el) {
            this.$el = $el;
            this.options = [...$el.children];
            this.init();
        }

        init() {
            this.createElements();
            this.addEvents();
            this.$el.parentElement.removeChild(this.$el);
        }

        createElements() {
            // Input for value
            this.valueInput = document.createElement("input");
            this.valueInput.type = "text";
            this.valueInput.name = this.$el.name;

            // Dropdown container
            this.dropdown = document.createElement("div");
            this.dropdown.classList.add("dropdown");

            // List container
            this.ul = document.createElement("ul");

            // All list options
            this.options.forEach((el, i) => {
                const li = document.createElement("li");
                li.dataset.value = el.value;
                li.innerText = el.innerText;

                if (i === 0) {
                    // First clickable option
                    this.current = document.createElement("div");
                    this.current.innerText = el.innerText;
                    this.dropdown.appendChild(this.current);
                    this.valueInput.value = el.value;
                    li.classList.add("selected");
                }

                this.ul.appendChild(li);
            });

            this.dropdown.appendChild(this.ul);
            this.dropdown.appendChild(this.valueInput);
            this.$el.parentElement.appendChild(this.dropdown);
        }

        addEvents() {
            this.dropdown.addEventListener("click", e => {
                const target = e.target;
                this.dropdown.classList.toggle("selecting");

                // Save new value only when clicked on li
                if (target.tagName === "LI") {
                    this.valueInput.value = target.dataset.value;
                    this.current.innerText = target.innerText;
                }
            });
        }
    }

    document.querySelectorAll(".form-group--dropdown select").forEach(el => {
        new FormSelect(el);
    });

    /**
     * Hide elements when clicked on document
     */
    document.addEventListener("click", function (e) {
        const target = e.target;
        const tagName = target.tagName;

        if (target.classList.contains("dropdown")) return false;

        if (tagName === "LI" && target.parentElement.parentElement.classList.contains("dropdown")) {
            return false;
        }

        if (tagName === "DIV" && target.parentElement.classList.contains("dropdown")) {
            return false;
        }

        document.querySelectorAll(".form-group--dropdown .dropdown").forEach(el => {
            el.classList.remove("selecting");
        });
    });

    /**
     * Switching between form steps
     */
    class FormSteps {
        constructor(form) {
            this.$form = form;
            this.$next = form.querySelectorAll(".next-step");
            this.$prev = form.querySelectorAll(".prev-step");
            this.$step = form.querySelector(".form--steps-counter span");
            this.currentStep = 1;

            this.$stepInstructions = form.querySelectorAll(".form--steps-instructions p");
            const $stepForms = form.querySelectorAll("form > div");
            this.slides = [...this.$stepInstructions, ...$stepForms];

            this.init();
        }

        /**
         * Init all methods
         */
        init() {
            this.events();
            this.updateForm();
        }

        /**
         * All events that are happening in form
         */
        events() {
            // Next step
            this.$next.forEach(btn => {
                btn.addEventListener("click", e => {
                    e.preventDefault();
                    this.currentStep++;
                    this.updateForm();
                    if (this.currentStep === 2) {
                        const button = document.getElementById('x');
                        // console.log(button);
                        button.addEventListener("click", e => {
                            // e.preventDefault();
                            show_id();

                        })


                    }
                    if (this.currentStep === 5) {
                        const quantity = document.getElementsByTagName('input').namedItem('bags');
                        const ids = get_checked_chexboxes();
                        const radio = get_checked_radio();
                        const categories_names = []
                        ids.forEach(id => {
                            categories_names.push(document.getElementById(id).innerText)
                        })


                        const bags_summary = document.getElementById('bags');
                        if (quantity.value === '1') {
                            bags_summary.innerText = quantity.value + ' worek z: ' + categories_names;
                        } else if (parseInt(quantity.value) <= 4) {
                            bags_summary.innerText = quantity.value + ' worki z: ' + categories_names;
                        } else if (parseInt(quantity.value) > 4) {
                            bags_summary.innerText = quantity.value + ' work??w z: ' + categories_names;
                        }

                        const fund = document.getElementById('fund');
                        fund.innerText = "Dla: " + radio;

                        const address = document.querySelector('input[name="address"]').value;
                        const city = document.querySelector('input[name="city"]').value;
                        const postcode = document.querySelector('input[name="postcode"]').value;
                        const phone = document.querySelector('input[name="phone"]').value;
                        const date = document.querySelector('input[name="date"]').value;
                        const time = document.querySelector('input[name="time"]').value;
                        const more_info = document.querySelector('textarea[name="more_info"]').value;

                        const street_sum = document.getElementById('street');
                        const city_sum = document.getElementById('city');
                        const postcode_sum = document.getElementById('postcode');
                        const phone_sum = document.getElementById('phone');
                        const date_sum = document.getElementById('date');
                        const time_sum = document.getElementById('time');
                        const more_info_sum = document.getElementById('more_info');

                        street_sum.innerText = address;
                        city_sum.innerText = city;
                        postcode_sum.innerText = postcode;
                        phone_sum.innerText = phone;
                        date_sum.innerText = date;
                        time_sum.innerText = time;
                        more_info_sum.innerText = more_info;


                    }
                })

            });


            // Previous step
            this.$prev.forEach(btn => {
                btn.addEventListener("click", e => {
                    e.preventDefault();
                    this.currentStep--;
                    this.updateForm();
                });
            });

            // Form submit
            this.$form.querySelector("form").addEventListener("submit", e => this.submit(e));
        }

        /**
         * Update form front-end
         * Show next or previous section etc.
         */
        updateForm() {
            this.$step.innerText = this.currentStep;

            // TODO: Validation

            this.slides.forEach(slide => {
                slide.classList.remove("active");

                if (slide.dataset.step == this.currentStep) {
                    slide.classList.add("active");
                }
            });

            this.$stepInstructions[0].parentElement.parentElement.hidden = this.currentStep >= 6;
            this.$step.parentElement.hidden = this.currentStep >= 6;

            // TODO: get data from inputs and show them in summary


            // const markedCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');
            // const ids = [];
            // markedCheckbox.forEach(box => ids.push(box.value));
            // console.log(ids);
            // return ids;
            // const orgs = document.getElementsByName("organization")


        }

        /**
         * Submit form
         *
         * TODO: validation, send data to server
         */
        submit(e) {
            e.preventDefault();
            this.currentStep++;
            this.updateForm();
        }
    }

    const form = document.querySelector(".form--steps");
    if (form !== null) {
        new FormSteps(form);
    }

    function show_id(event) {
        const ids = get_checked_chexboxes();
        const params = new URLSearchParams();
        ids.forEach(id => params.append("type_ids", id))
        const address = '/get_organizations?' + params.toString();
        fetch(address)
            .then(response => response.text())
            .then(data => document.getElementById("filter_org").innerHTML = data);

    }

    function get_checked_chexboxes() {
        const markedCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');
        const ids = [];
        markedCheckbox.forEach(box => ids.push(box.value));
        return ids;
    }

    function get_checked_radio() {
        const markedRadio = document.querySelector('input[type="radio"]:checked');
        const ids = [];
        const title = markedRadio.nextElementSibling.nextElementSibling.firstElementChild;
        ids.push(title.innerText);
        return ids;
    }






    // function checkValue() {
    //     const inputs = document.getElementsByTagName("input");
    //     inputs.forEach(input => {
    //         if (input.value === "") {
    //             const att = document.createAttribute("required");
    //             input.setAttributeNode(att);
    //         }
    //     })
    //
    // }


});
