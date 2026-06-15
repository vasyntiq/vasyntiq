const animatedElements =

    document.querySelectorAll(
        ".animate-element"
    );

const counters =

    document.querySelectorAll(
        ".counter"
    );

let counterStarted = false;

const observer =

    new IntersectionObserver(

        entries => {

            entries.forEach(

                entry => {

                    if (

                        entry.isIntersecting

                    ) {

                        entry.target.classList.add(
                            "show"
                        );

                        /* Stagger Card Animation */

                        if (

                            entry.target.classList.contains(
                                "metric-card"
                            )

                        ) {

                            const cards =

                                document.querySelectorAll(
                                    ".metric-card"
                                );

                            cards.forEach(

                                (
                                    card,
                                    index
                                ) => {

                                    setTimeout(

                                        () => {

                                            card.classList.add(
                                                "show"
                                            );

                                        },

                                        index * 400
                                    );

                                }
                            );
                        }

                        /* Counter Animation */

                        if (

                            !counterStarted

                        ) {

                            counters.forEach(

                                counter => {

                                    const target =

                                        +counter.dataset.target;

                                    let current = 0;

                                    const duration = 3000;

                                    const increment =

                                        target /

                                        (
                                            duration /
                                            16
                                        );

                                    function updateCounter() {

                                        current += increment;

                                        if (

                                            current >= target

                                        ) {

                                            counter.textContent =

                                                target;

                                        } else {

                                            counter.textContent =

                                                Math.floor(
                                                    current
                                                );

                                            requestAnimationFrame(
                                                updateCounter
                                            );
                                        }
                                    }

                                    updateCounter();
                                }
                            );

                            counterStarted = true;
                        }

                        observer.unobserve(
                            entry.target
                        );
                    }
                }
            );
        },

        {

            threshold: 0.25
        }
    );


animatedElements.forEach(

    element => {

        observer.observe(
            element
        );
    }
);