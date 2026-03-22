package com.eventzen.budgetservice;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BudgetRepository extends MongoRepository<Budget, String> {
    Optional<Budget> findByEventId(String eventId);
}