package com.example.emoneyblog.models.documents;

import com.example.emoneyblog.models.Component;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "blogs")

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Blog {
    @Id
    private Long id;

    private String username;

    private String title;

    private String image_link;

    @Field("date_modification")
    private LocalDateTime lastModificationDate;

    @DBRef
    private List<Comment> comments = new ArrayList<>();

    private List<Component> components = new ArrayList<>();

    private Boolean approved;


}
