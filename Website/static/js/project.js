document.addEventListener(

    "DOMContentLoaded",

    () => {

        const projectCards =

            document.querySelectorAll(
                ".project-card"
            );

        const projectObserver =

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

                                projectObserver.unobserve(
                                    entry.target
                                );
                            }
                        }
                    );
                },

                {

                    threshold: 0.2
                }
            );

        projectCards.forEach(

            (card, index) => {

                card.style.transitionDelay =

                    `${index * 0.2}s`;

                projectObserver.observe(
                    card
                );
            }
        );
    }
);