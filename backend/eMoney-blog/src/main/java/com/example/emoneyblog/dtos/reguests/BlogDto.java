package com.example.emoneyblog.dtos.reguests;

import com.example.emoneyblog.models.Component;
import com.example.emoneyblog.models.documents.Comment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BlogDto {

    private String username;

    private String title;

    private String image_link;

    private List<Component> components = new ArrayList<>();

}
