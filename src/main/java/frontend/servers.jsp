<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

        <h1>Read Servers</h1>
        <table border="2" width="70%" cellpadding="2">
            <tr>
                <th>Id</th>
                <th>Server Name</th>
                <th>Server IP</th>
                <th>Server Location</th>
                <th>Server Type</th>
                <th>Is Host</th>
            </tr>
            <c:forEach var="servers" items="${servers}">
                <tr>
                    <td>${servers.id}</td>
                    <td>${servers.name}</td>
                    <td>${contact.email}</td>
                    <td>${contact.country}</td>
                    <td><a href="/update-contact/${contact.id}">Update</a></td>
                    <td><a href="/delete-contact/${contact.id}">Delete</a></td>
                </tr>
            </c:forEach>
        </table>
        <br />
        <a href="/create-contact">Create Contact</a>