package com.eventzen.budgetservice;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/budget")
@CrossOrigin(origins = "*")
public class BudgetController {

    @Autowired
    private BudgetRepository budgetRepository;

    @PostMapping
    public Budget createBudget(@RequestBody Budget budget) {
        return budgetRepository.save(budget);
    }

    @GetMapping("/{eventId}")
    public Optional<Budget> getBudget(@PathVariable String eventId) {
        return budgetRepository.findByEventId(eventId);
    }

    @PostMapping("/{eventId}/expense")
    public Budget addExpense(@PathVariable String eventId, @RequestBody Budget.Expense expense) {
        Budget budget = budgetRepository.findByEventId(eventId)
            .orElseThrow(() -> new RuntimeException("Budget not found"));
        budget.getExpenses().add(expense);
        return budgetRepository.save(budget);
    }

    @DeleteMapping("/{id}")
    public void deleteBudget(@PathVariable String id) {
        budgetRepository.deleteById(id);
    }
}