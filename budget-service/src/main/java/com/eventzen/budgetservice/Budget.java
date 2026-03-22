package com.eventzen.budgetservice;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import java.util.List;
import java.util.ArrayList;

@Data
@Document(collection = "budgets")
public class Budget {
    @Id
    private String id;
    private String eventId;
    private Double totalBudget;
    private List<Expense> expenses = new ArrayList<>();

    @Data
    public static class Expense {
        private String name;
        private Double amount;
        private String category;
    }
}