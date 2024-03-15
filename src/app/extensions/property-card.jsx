import React, { useState } from "react";
import {
    Divider,
    Link,
    Button,
    Text,
    Input,
    Stack,
    Flex,
    hubspot,
    Accordion,
    DescriptionList,
    DescriptionListItem
  } from "@hubspot/ui-extensions";
  import { useEffect } from "react";

  // Defining the extension (card)

  hubspot.extend(({ actions }) => (
    <PropertyCard
        fetchProperties={actions.fetchCrmObjectProperties}
    />
  ))

  const PropertyCard = ({ fetchProperties }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(() => {
        fetchProperties(["firstname", "lastname"])
          .then(properties => {
            setFirstName(properties.firstname);
            setLastName(properties.lastname);
        });
    }, [fetchProperties]);
    return (
        <Text>Hello {firstName} {lastName}</Text>
       );
  }