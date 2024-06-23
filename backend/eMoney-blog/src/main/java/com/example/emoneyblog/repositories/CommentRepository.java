package com.example.emoneyblog.repositories;

import com.example.emoneyblog.models.documents.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CommentRepository extends MongoRepository<Comment, Long> {
}
