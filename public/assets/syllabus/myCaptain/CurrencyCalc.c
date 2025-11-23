#include <stdio.h>

int main() {
    int choice;
    float amount, result;

    printf("Simple Currency Converter\n");
    printf("1. USD to INR\n");
    printf("2. INR to USD\n");
    printf("3. USD to EUR\n");
    printf("4. EUR to USD\n");
    printf("Enter your choice: ");
    scanf("%d", &choice);

    printf("Enter amount: ");
    scanf("%f", &amount);

    switch (choice) {
        case 1:
            result = amount * 83.12; // Example rate
            printf("%.2f USD = %.2f INR\n", amount, result);
            break;
        case 2:
            result = amount / 83.12;
            printf("%.2f INR = %.2f USD\n", amount, result);
            break;
        case 3:
            result = amount * 0.93;
            printf("%.2f USD = %.2f EUR\n", amount, result);
            break;
        case 4:
            result = amount / 0.93;
            printf("%.2f EUR = %.2f USD\n", amount, result);
            break;
        default:
            printf("Invalid choice!\n");
    }

    return 0;
}
