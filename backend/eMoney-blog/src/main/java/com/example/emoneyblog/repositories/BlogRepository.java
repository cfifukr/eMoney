package com.example.emoneyblog.repositories;

import com.example.emoneyblog.models.documents.Blog;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BlogRepository extends MongoRepository<Blog, Long> {
}
