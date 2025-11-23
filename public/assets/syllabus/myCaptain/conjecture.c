#include <stdio.h>

int main() {
    int n;
    int steps = 0;

    printf("Enter a positive integer: ");
    scanf("%d", &n);

    while (n != 1) {
        if (n % 2 == 0)
            n = n / 2;
        else
            n = 3 * n + 1;
        steps++;
    }

    printf("Number of steps to reach 1: %d\n", steps);
    return 0;
}