package com.lhu.chatapplication.controller;

import com.lhu.chatapplication.dto.MessageFromProducerDto;
import com.lhu.chatapplication.dto.MessageToUserDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.security.Principal;

@Controller
@Slf4j
public class MessageHandlingController {
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;


    @GetMapping("/countNumber")
    @ResponseBody
    public String countNumber() throws InterruptedException {
        for (int a = 0; a < 101; a++) {
            Thread.sleep(10);
            countNumber(a);
        }
        return "Called countNumber..";
    }

    @GetMapping("/getUser")
    @ResponseBody
    public String getUser(Principal principal){
        if (principal == null) {
            return "";
        }
        return principal.getName();
    }

    @SendTo("/count/number")
    public int countNumber(int number) {
        log.info("GreetingController.countNumber : " + number);
        return number;
    }

    // MAP AS -> /websocket/publicMessage
    @MessageMapping("/publicMessage")
    @SendTo("/allUser/message")
    public MessageToUserDto greeting(MessageFromProducerDto message, Principal principal) {
        log.info("GreetingController.greeting.." + message.toString());
        return new MessageToUserDto(principal.getName(), message.getMessageTo(), message.getMessageText());
    }

    // MAP AS -> /websocket/privateMessage
    @MessageMapping("/privateMessage")
    public void privateMessage(MessageFromProducerDto message, Principal principal) {
        message.setMessageFrom(principal.getName());
        log.info("GreetingController.privateMessage.." + message.toString());
        simpMessagingTemplate.convertAndSendToUser(message.getMessageTo(), "/specificUser", message);
       // return new MessageToUserDto(principal.getName(), message.getMessageTo(), message.getMessageText());
    }
}