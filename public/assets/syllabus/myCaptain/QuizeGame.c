#include <stdio.h>

int main() {
    int score = 0;
    char answer;

    printf("\n===== QUIZ GAME =====\n\n");

    // Question 1
    printf("1. What is the capital city of India?\n");
    printf("A) Jaipur  B) New Delhi  C) Mumbai  D) Calcutta\n");
    printf("Your answer: ");
    scanf(" %c", &answer);

    if (answer == 'B' || answer == 'b') {
        printf("Correct!\n\n");
        score++;
    } else {
        printf("Wrong! The correct answer is B. New Delhi\n\n");
    }

    // Question 2
    printf("2. Sum of external angles of a shape:\n");
    printf("A) 120 degree  B) 180 degree  C) 360 degree  D) 540 degree\n");
    printf("Your answer: ");
    scanf(" %c", &answer);

    if (answer == 'C' || answer == 'c') {
        printf("Correct!\n\n");
        score++;
    } else {
        printf("Wrong! The correct answer is C. 360 degree\n\n");
    }

    // Question 3
    printf("3. In C, there are ..... keywords\n");
    printf("A) 40  B) 32  C) 50  D) 64\n");
    printf("Your answer: ");
    scanf(" %c", &answer);

    if (answer == 'B' || answer == 'b') {
        printf("Correct!\n\n");
        score++;
    } else {
        printf("Wrong! The correct answer is B. 32 keywords\n\n");
    }

    // Final score
    printf("Your final score is: %d/3\n", score);

    return 0;
}
