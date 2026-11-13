CREATE TABLE IF NOT EXISTS `__EFMigrationsHistory` (
    `MigrationId` varchar(150) CHARACTER SET utf8mb4 NOT NULL,
    `ProductVersion` varchar(32) CHARACTER SET utf8mb4 NOT NULL,
    CONSTRAINT `PK___EFMigrationsHistory` PRIMARY KEY (`MigrationId`)
) CHARACTER SET=utf8mb4;

START TRANSACTION;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    ALTER DATABASE CHARACTER SET utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE TABLE `AspNetRoles` (
        `Id` char(36) COLLATE ascii_general_ci NOT NULL,
        `Name` varchar(256) CHARACTER SET utf8mb4 NULL,
        `NormalizedName` varchar(256) CHARACTER SET utf8mb4 NULL,
        `ConcurrencyStamp` longtext CHARACTER SET utf8mb4 NULL,
        CONSTRAINT `PK_AspNetRoles` PRIMARY KEY (`Id`)
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE TABLE `businesses` (
        `Id` char(36) COLLATE ascii_general_ci NOT NULL,
        `Name` varchar(120) CHARACTER SET utf8mb4 NOT NULL,
        `CreatedAt` datetime(6) NOT NULL,
        CONSTRAINT `PK_businesses` PRIMARY KEY (`Id`)
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE TABLE `AspNetRoleClaims` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `RoleId` char(36) COLLATE ascii_general_ci NOT NULL,
        `ClaimType` longtext CHARACTER SET utf8mb4 NULL,
        `ClaimValue` longtext CHARACTER SET utf8mb4 NULL,
        CONSTRAINT `PK_AspNetRoleClaims` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_AspNetRoleClaims_AspNetRoles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `AspNetRoles` (`Id`) ON DELETE CASCADE
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE TABLE `AspNetUsers` (
        `Id` char(36) COLLATE ascii_general_ci NOT NULL,
        `BusinessId` char(36) COLLATE ascii_general_ci NOT NULL,
        `FullName` varchar(120) CHARACTER SET utf8mb4 NOT NULL,
        `UserName` varchar(256) CHARACTER SET utf8mb4 NULL,
        `NormalizedUserName` varchar(256) CHARACTER SET utf8mb4 NULL,
        `Email` varchar(254) CHARACTER SET utf8mb4 NULL,
        `NormalizedEmail` varchar(256) CHARACTER SET utf8mb4 NULL,
        `EmailConfirmed` tinyint(1) NOT NULL,
        `PasswordHash` longtext CHARACTER SET utf8mb4 NULL,
        `SecurityStamp` longtext CHARACTER SET utf8mb4 NULL,
        `ConcurrencyStamp` longtext CHARACTER SET utf8mb4 NULL,
        `PhoneNumber` longtext CHARACTER SET utf8mb4 NULL,
        `PhoneNumberConfirmed` tinyint(1) NOT NULL,
        `TwoFactorEnabled` tinyint(1) NOT NULL,
        `LockoutEnd` datetime(6) NULL,
        `LockoutEnabled` tinyint(1) NOT NULL,
        `AccessFailedCount` int NOT NULL,
        CONSTRAINT `PK_AspNetUsers` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_AspNetUsers_businesses_BusinessId` FOREIGN KEY (`BusinessId`) REFERENCES `businesses` (`Id`) ON DELETE RESTRICT
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE TABLE `loans` (
        `Id` char(36) COLLATE ascii_general_ci NOT NULL,
        `BusinessId` char(36) COLLATE ascii_general_ci NOT NULL,
        `Name` varchar(120) CHARACTER SET utf8mb4 NOT NULL,
        `Currency` varchar(3) CHARACTER SET utf8mb4 NOT NULL,
        `PrincipalCents` bigint NOT NULL,
        `AnnualRateBasisPoints` int NULL,
        `CreatedAt` datetime(6) NOT NULL,
        CONSTRAINT `PK_loans` PRIMARY KEY (`Id`),
        CONSTRAINT `AK_loans_Id_BusinessId` UNIQUE (`Id`, `BusinessId`),
        CONSTRAINT `ck_loans_currency` CHECK (`Currency` IN ('PEN','USD')),
        CONSTRAINT `ck_loans_principal` CHECK (`PrincipalCents` BETWEEN 1 AND 999999999),
        CONSTRAINT `ck_loans_rate` CHECK (`AnnualRateBasisPoints` BETWEEN 0 AND 10000),
        CONSTRAINT `FK_loans_businesses_BusinessId` FOREIGN KEY (`BusinessId`) REFERENCES `businesses` (`Id`) ON DELETE RESTRICT
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE TABLE `suppliers` (
        `Id` char(36) COLLATE ascii_general_ci NOT NULL,
        `BusinessId` char(36) COLLATE ascii_general_ci NOT NULL,
        `Name` varchar(160) CHARACTER SET utf8mb4 NOT NULL,
        `Email` varchar(254) CHARACTER SET utf8mb4 NULL,
        `TaxId` varchar(32) CHARACTER SET utf8mb4 NULL,
        `Phone` varchar(30) CHARACTER SET utf8mb4 NULL,
        `CreatedAt` datetime(6) NOT NULL,
        CONSTRAINT `PK_suppliers` PRIMARY KEY (`Id`),
        CONSTRAINT `AK_suppliers_Id_BusinessId` UNIQUE (`Id`, `BusinessId`),
        CONSTRAINT `FK_suppliers_businesses_BusinessId` FOREIGN KEY (`BusinessId`) REFERENCES `businesses` (`Id`) ON DELETE RESTRICT
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE TABLE `treasury_parties` (
        `Id` char(36) COLLATE ascii_general_ci NOT NULL,
        `BusinessId` char(36) COLLATE ascii_general_ci NOT NULL,
        `Name` varchar(160) CHARACTER SET utf8mb4 NOT NULL,
        `Type` varchar(10) CHARACTER SET utf8mb4 NOT NULL,
        `CreatedBy` char(36) COLLATE ascii_general_ci NOT NULL,
        `CreatedAt` datetime(6) NOT NULL,
        CONSTRAINT `PK_treasury_parties` PRIMARY KEY (`Id`),
        CONSTRAINT `AK_treasury_parties_Id_BusinessId` UNIQUE (`Id`, `BusinessId`),
        CONSTRAINT `ck_treasury_party_type` CHECK (`Type` IN ('person', 'company')),
        CONSTRAINT `FK_treasury_parties_businesses_BusinessId` FOREIGN KEY (`BusinessId`) REFERENCES `businesses` (`Id`) ON DELETE RESTRICT
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE TABLE `AspNetUserClaims` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `UserId` char(36) COLLATE ascii_general_ci NOT NULL,
        `ClaimType` longtext CHARACTER SET utf8mb4 NULL,
        `ClaimValue` longtext CHARACTER SET utf8mb4 NULL,
        CONSTRAINT `PK_AspNetUserClaims` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_AspNetUserClaims_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE TABLE `AspNetUserLogins` (
        `LoginProvider` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
        `ProviderKey` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
        `ProviderDisplayName` longtext CHARACTER SET utf8mb4 NULL,
        `UserId` char(36) COLLATE ascii_general_ci NOT NULL,
        CONSTRAINT `PK_AspNetUserLogins` PRIMARY KEY (`LoginProvider`, `ProviderKey`),
        CONSTRAINT `FK_AspNetUserLogins_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE TABLE `AspNetUserRoles` (
        `UserId` char(36) COLLATE ascii_general_ci NOT NULL,
        `RoleId` char(36) COLLATE ascii_general_ci NOT NULL,
        CONSTRAINT `PK_AspNetUserRoles` PRIMARY KEY (`UserId`, `RoleId`),
        CONSTRAINT `FK_AspNetUserRoles_AspNetRoles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `AspNetRoles` (`Id`) ON DELETE CASCADE,
        CONSTRAINT `FK_AspNetUserRoles_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE TABLE `AspNetUserTokens` (
        `UserId` char(36) COLLATE ascii_general_ci NOT NULL,
        `LoginProvider` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
        `Name` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
        `Value` longtext CHARACTER SET utf8mb4 NULL,
        CONSTRAINT `PK_AspNetUserTokens` PRIMARY KEY (`UserId`, `LoginProvider`, `Name`),
        CONSTRAINT `FK_AspNetUserTokens_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE TABLE `loan_installments` (
        `LoanId` char(36) COLLATE ascii_general_ci NOT NULL,
        `Number` int NOT NULL,
        `BusinessId` char(36) COLLATE ascii_general_ci NOT NULL,
        `DueOn` date NOT NULL,
        `AmountCents` bigint NOT NULL,
        CONSTRAINT `PK_loan_installments` PRIMARY KEY (`LoanId`, `Number`),
        CONSTRAINT `ck_loan_installments_amount` CHECK (`AmountCents` BETWEEN 1 AND 999999999),
        CONSTRAINT `ck_loan_installments_number` CHECK (`Number` BETWEEN 1 AND 60),
        CONSTRAINT `FK_loan_installments_loans_LoanId_BusinessId` FOREIGN KEY (`LoanId`, `BusinessId`) REFERENCES `loans` (`Id`, `BusinessId`) ON DELETE CASCADE
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE TABLE `purchases` (
        `Id` char(36) COLLATE ascii_general_ci NOT NULL,
        `BusinessId` char(36) COLLATE ascii_general_ci NOT NULL,
        `SupplierId` char(36) COLLATE ascii_general_ci NOT NULL,
        `Reference` varchar(80) CHARACTER SET utf8mb4 NOT NULL,
        `NormalizedReference` varchar(80) CHARACTER SET utf8mb4 NOT NULL,
        `Description` varchar(200) CHARACTER SET utf8mb4 NOT NULL,
        `Currency` varchar(3) CHARACTER SET utf8mb4 NOT NULL,
        `Amount` decimal(14,2) NOT NULL,
        `PurchasedOn` date NOT NULL,
        `DueOn` date NOT NULL,
        `CreatedAt` datetime(6) NOT NULL,
        `Version` char(36) COLLATE ascii_general_ci NOT NULL,
        CONSTRAINT `PK_purchases` PRIMARY KEY (`Id`),
        CONSTRAINT `AK_purchases_Id_BusinessId` UNIQUE (`Id`, `BusinessId`),
        CONSTRAINT `ck_purchases_amount` CHECK (`Amount` > 0 AND `Amount` <= 9999999.99),
        CONSTRAINT `ck_purchases_currency` CHECK (`Currency` IN ('PEN', 'USD')),
        CONSTRAINT `ck_purchases_date_bounds` CHECK (`PurchasedOn` >= '2000-01-01' AND `DueOn` <= '2100-12-31'),
        CONSTRAINT `ck_purchases_dates` CHECK (`DueOn` >= `PurchasedOn`),
        CONSTRAINT `FK_purchases_businesses_BusinessId` FOREIGN KEY (`BusinessId`) REFERENCES `businesses` (`Id`) ON DELETE RESTRICT,
        CONSTRAINT `FK_purchases_suppliers_SupplierId_BusinessId` FOREIGN KEY (`SupplierId`, `BusinessId`) REFERENCES `suppliers` (`Id`, `BusinessId`) ON DELETE RESTRICT
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE TABLE `treasury_accounts` (
        `Id` char(36) COLLATE ascii_general_ci NOT NULL,
        `BusinessId` char(36) COLLATE ascii_general_ci NOT NULL,
        `Name` varchar(160) CHARACTER SET utf8mb4 NOT NULL,
        `Currency` varchar(3) CHARACTER SET utf8mb4 NOT NULL,
        `HolderId` char(36) COLLATE ascii_general_ci NOT NULL,
        `Kind` varchar(10) CHARACTER SET utf8mb4 NOT NULL,
        `Ending` varchar(4) CHARACTER SET utf8mb4 NOT NULL,
        `Version` char(36) COLLATE ascii_general_ci NOT NULL,
        `CreatedBy` char(36) COLLATE ascii_general_ci NOT NULL,
        `CreatedAt` datetime(6) NOT NULL,
        CONSTRAINT `PK_treasury_accounts` PRIMARY KEY (`Id`),
        CONSTRAINT `AK_treasury_accounts_Id_BusinessId` UNIQUE (`Id`, `BusinessId`),
        CONSTRAINT `ck_treasury_account_currency` CHECK (`Currency` IN ('PEN', 'USD')),
        CONSTRAINT `ck_treasury_account_kind` CHECK (`Kind` IN ('bank', 'cash')),
        CONSTRAINT `FK_treasury_accounts_treasury_parties_HolderId_BusinessId` FOREIGN KEY (`HolderId`, `BusinessId`) REFERENCES `treasury_parties` (`Id`, `BusinessId`) ON DELETE RESTRICT
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE TABLE `treasury_projects` (
        `Id` char(36) COLLATE ascii_general_ci NOT NULL,
        `BusinessId` char(36) COLLATE ascii_general_ci NOT NULL,
        `Name` varchar(160) CHARACTER SET utf8mb4 NOT NULL,
        `OwnerId` char(36) COLLATE ascii_general_ci NOT NULL,
        `ResponsibleId` char(36) COLLATE ascii_general_ci NOT NULL,
        `Currency` varchar(3) CHARACTER SET utf8mb4 NOT NULL,
        `BudgetCents` bigint NULL,
        `CreatedBy` char(36) COLLATE ascii_general_ci NOT NULL,
        `CreatedAt` datetime(6) NOT NULL,
        CONSTRAINT `PK_treasury_projects` PRIMARY KEY (`Id`),
        CONSTRAINT `AK_treasury_projects_Id_BusinessId` UNIQUE (`Id`, `BusinessId`),
        CONSTRAINT `ck_treasury_project_budget` CHECK (`BudgetCents` IS NULL OR (`BudgetCents` > 0 AND `BudgetCents` <= 999999999)),
        CONSTRAINT `ck_treasury_project_currency` CHECK (`Currency` IN ('PEN', 'USD')),
        CONSTRAINT `FK_treasury_projects_treasury_parties_OwnerId_BusinessId` FOREIGN KEY (`OwnerId`, `BusinessId`) REFERENCES `treasury_parties` (`Id`, `BusinessId`) ON DELETE RESTRICT,
        CONSTRAINT `FK_treasury_projects_treasury_parties_ResponsibleId_BusinessId` FOREIGN KEY (`ResponsibleId`, `BusinessId`) REFERENCES `treasury_parties` (`Id`, `BusinessId`) ON DELETE RESTRICT
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE TABLE `payments` (
        `Id` char(36) COLLATE ascii_general_ci NOT NULL,
        `BusinessId` char(36) COLLATE ascii_general_ci NOT NULL,
        `PurchaseId` char(36) COLLATE ascii_general_ci NOT NULL,
        `Amount` decimal(14,2) NOT NULL,
        `Currency` varchar(3) CHARACTER SET utf8mb4 NOT NULL,
        `PaidOn` date NOT NULL,
        `Note` varchar(200) CHARACTER SET utf8mb4 NULL,
        `CreatedAt` datetime(6) NOT NULL,
        CONSTRAINT `PK_payments` PRIMARY KEY (`Id`),
        CONSTRAINT `AK_payments_Id_PurchaseId_BusinessId` UNIQUE (`Id`, `PurchaseId`, `BusinessId`),
        CONSTRAINT `ck_payments_amount` CHECK (`Amount` > 0 AND `Amount` <= 9999999.99),
        CONSTRAINT `ck_payments_currency` CHECK (`Currency` IN ('PEN', 'USD')),
        CONSTRAINT `FK_payments_purchases_PurchaseId_BusinessId` FOREIGN KEY (`PurchaseId`, `BusinessId`) REFERENCES `purchases` (`Id`, `BusinessId`) ON DELETE RESTRICT
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE TABLE `treasury_movements` (
        `Id` char(36) COLLATE ascii_general_ci NOT NULL,
        `BusinessId` char(36) COLLATE ascii_general_ci NOT NULL,
        `AccountId` char(36) COLLATE ascii_general_ci NOT NULL,
        `SignedCents` bigint NOT NULL,
        `Kind` varchar(20) CHARACTER SET utf8mb4 NOT NULL,
        `BookedOn` date NOT NULL,
        `Reference` varchar(80) CHARACTER SET utf8mb4 NOT NULL,
        `NormalizedReference` varchar(80) CHARACTER SET utf8mb4 NOT NULL,
        `Description` varchar(200) CHARACTER SET utf8mb4 NOT NULL,
        `CounterpartyId` char(36) COLLATE ascii_general_ci NOT NULL,
        `CreatedBy` char(36) COLLATE ascii_general_ci NOT NULL,
        `CreatedAt` datetime(6) NOT NULL,
        CONSTRAINT `PK_treasury_movements` PRIMARY KEY (`Id`),
        CONSTRAINT `AK_treasury_movements_Id_BusinessId_AccountId` UNIQUE (`Id`, `BusinessId`, `AccountId`),
        CONSTRAINT `ck_treasury_movement_amount` CHECK (`SignedCents` <> 0 AND `SignedCents` BETWEEN -999999999 AND 999999999),
        CONSTRAINT `ck_treasury_movement_date` CHECK (`BookedOn` BETWEEN '2000-01-01' AND '2100-12-31'),
        CONSTRAINT `ck_treasury_movement_kind` CHECK (`Kind` IN ('income','expense','thirdParty','reimbursement','loan','opening','unclassified','collection')),
        CONSTRAINT `FK_treasury_movements_treasury_accounts_AccountId_BusinessId` FOREIGN KEY (`AccountId`, `BusinessId`) REFERENCES `treasury_accounts` (`Id`, `BusinessId`) ON DELETE RESTRICT,
        CONSTRAINT `FK_treasury_movements_treasury_parties_CounterpartyId_BusinessId` FOREIGN KEY (`CounterpartyId`, `BusinessId`) REFERENCES `treasury_parties` (`Id`, `BusinessId`) ON DELETE RESTRICT
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE TABLE `attachments` (
        `Id` char(36) COLLATE ascii_general_ci NOT NULL,
        `BusinessId` char(36) COLLATE ascii_general_ci NOT NULL,
        `PurchaseId` char(36) COLLATE ascii_general_ci NOT NULL,
        `PaymentId` char(36) COLLATE ascii_general_ci NULL,
        `FileName` varchar(160) CHARACTER SET utf8mb4 NOT NULL,
        `ContentType` varchar(40) CHARACTER SET utf8mb4 NOT NULL,
        `Length` bigint NOT NULL,
        `StoredName` varchar(37) CHARACTER SET utf8mb4 NOT NULL,
        `CreatedAt` datetime(6) NOT NULL,
        `ReceiptPurchaseId` char(36) COLLATE ascii_general_ci AS (CASE WHEN `PaymentId` IS NULL THEN `PurchaseId` ELSE NULL END) STORED NULL,
        CONSTRAINT `PK_attachments` PRIMARY KEY (`Id`),
        CONSTRAINT `ck_attachments_length` CHECK (`Length` > 0 AND `Length` <= 2097152),
        CONSTRAINT `ck_attachments_type` CHECK (`ContentType` IN ('application/pdf', 'image/png', 'image/jpeg')),
        CONSTRAINT `FK_attachments_payments_PaymentId_PurchaseId_BusinessId` FOREIGN KEY (`PaymentId`, `PurchaseId`, `BusinessId`) REFERENCES `payments` (`Id`, `PurchaseId`, `BusinessId`) ON DELETE RESTRICT,
        CONSTRAINT `FK_attachments_purchases_PurchaseId_BusinessId` FOREIGN KEY (`PurchaseId`, `BusinessId`) REFERENCES `purchases` (`Id`, `BusinessId`) ON DELETE RESTRICT
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE TABLE `treasury_allocations` (
        `Id` char(36) COLLATE ascii_general_ci NOT NULL,
        `BusinessId` char(36) COLLATE ascii_general_ci NOT NULL,
        `AccountId` char(36) COLLATE ascii_general_ci NOT NULL,
        `MovementId` char(36) COLLATE ascii_general_ci NOT NULL,
        `OwnerId` char(36) COLLATE ascii_general_ci NOT NULL,
        `ResponsibleId` char(36) COLLATE ascii_general_ci NOT NULL,
        `ProjectId` char(36) COLLATE ascii_general_ci NULL,
        `Cents` bigint NOT NULL,
        `CreatedBy` char(36) COLLATE ascii_general_ci NOT NULL,
        `CreatedAt` datetime(6) NOT NULL,
        CONSTRAINT `PK_treasury_allocations` PRIMARY KEY (`Id`),
        CONSTRAINT `ck_treasury_allocation_amount` CHECK (`Cents` > 0 AND `Cents` <= 999999999),
        CONSTRAINT `FK_treasury_allocations_treasury_movements_MovementId_BusinessI~` FOREIGN KEY (`MovementId`, `BusinessId`, `AccountId`) REFERENCES `treasury_movements` (`Id`, `BusinessId`, `AccountId`) ON DELETE RESTRICT,
        CONSTRAINT `FK_treasury_allocations_treasury_parties_OwnerId_BusinessId` FOREIGN KEY (`OwnerId`, `BusinessId`) REFERENCES `treasury_parties` (`Id`, `BusinessId`) ON DELETE RESTRICT,
        CONSTRAINT `FK_treasury_allocations_treasury_parties_ResponsibleId_Business~` FOREIGN KEY (`ResponsibleId`, `BusinessId`) REFERENCES `treasury_parties` (`Id`, `BusinessId`) ON DELETE RESTRICT,
        CONSTRAINT `FK_treasury_allocations_treasury_projects_ProjectId_BusinessId` FOREIGN KEY (`ProjectId`, `BusinessId`) REFERENCES `treasury_projects` (`Id`, `BusinessId`) ON DELETE RESTRICT
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE TABLE `treasury_operations` (
        `Id` char(36) COLLATE ascii_general_ci NOT NULL,
        `BusinessId` char(36) COLLATE ascii_general_ci NOT NULL,
        `AccountId` char(36) COLLATE ascii_general_ci NOT NULL,
        `MovementId` char(36) COLLATE ascii_general_ci NOT NULL,
        `RequestId` char(36) COLLATE ascii_general_ci NOT NULL,
        `RequestHash` varchar(64) CHARACTER SET utf8mb4 NOT NULL,
        `Kind` varchar(20) CHARACTER SET utf8mb4 NOT NULL,
        `CreatedBy` char(36) COLLATE ascii_general_ci NOT NULL,
        `CreatedAt` datetime(6) NOT NULL,
        CONSTRAINT `PK_treasury_operations` PRIMARY KEY (`Id`),
        CONSTRAINT `ck_treasury_operation_kind` CHECK (`Kind` IN ('movement','allocate')),
        CONSTRAINT `FK_treasury_operations_treasury_accounts_AccountId_BusinessId` FOREIGN KEY (`AccountId`, `BusinessId`) REFERENCES `treasury_accounts` (`Id`, `BusinessId`) ON DELETE RESTRICT,
        CONSTRAINT `FK_treasury_operations_treasury_movements_MovementId_BusinessId~` FOREIGN KEY (`MovementId`, `BusinessId`, `AccountId`) REFERENCES `treasury_movements` (`Id`, `BusinessId`, `AccountId`) ON DELETE RESTRICT
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE INDEX `IX_AspNetRoleClaims_RoleId` ON `AspNetRoleClaims` (`RoleId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE UNIQUE INDEX `RoleNameIndex` ON `AspNetRoles` (`NormalizedName`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE INDEX `IX_AspNetUserClaims_UserId` ON `AspNetUserClaims` (`UserId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE INDEX `IX_AspNetUserLogins_UserId` ON `AspNetUserLogins` (`UserId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE INDEX `IX_AspNetUserRoles_RoleId` ON `AspNetUserRoles` (`RoleId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE UNIQUE INDEX `EmailIndex` ON `AspNetUsers` (`NormalizedEmail`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE INDEX `IX_AspNetUsers_BusinessId` ON `AspNetUsers` (`BusinessId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE UNIQUE INDEX `UserNameIndex` ON `AspNetUsers` (`NormalizedUserName`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE INDEX `IX_attachments_PaymentId_PurchaseId_BusinessId` ON `attachments` (`PaymentId`, `PurchaseId`, `BusinessId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE INDEX `ix_attachments_purchase` ON `attachments` (`BusinessId`, `PurchaseId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE INDEX `IX_attachments_PurchaseId_BusinessId` ON `attachments` (`PurchaseId`, `BusinessId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE UNIQUE INDEX `IX_attachments_StoredName` ON `attachments` (`StoredName`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE UNIQUE INDEX `ux_attachments_payment_voucher` ON `attachments` (`PaymentId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE UNIQUE INDEX `ux_attachments_purchase_receipt` ON `attachments` (`BusinessId`, `ReceiptPurchaseId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE INDEX `IX_loan_installments_LoanId_BusinessId` ON `loan_installments` (`LoanId`, `BusinessId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE INDEX `IX_loans_BusinessId_CreatedAt` ON `loans` (`BusinessId`, `CreatedAt`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE INDEX `IX_payments_BusinessId_PurchaseId_PaidOn` ON `payments` (`BusinessId`, `PurchaseId`, `PaidOn`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE INDEX `IX_payments_PurchaseId_BusinessId` ON `payments` (`PurchaseId`, `BusinessId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE INDEX `IX_purchases_BusinessId_DueOn` ON `purchases` (`BusinessId`, `DueOn`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE INDEX `IX_purchases_SupplierId_BusinessId` ON `purchases` (`SupplierId`, `BusinessId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE UNIQUE INDEX `ux_purchases_supplier_reference` ON `purchases` (`SupplierId`, `NormalizedReference`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE INDEX `IX_suppliers_BusinessId_Name` ON `suppliers` (`BusinessId`, `Name`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE INDEX `IX_treasury_accounts_BusinessId_Name` ON `treasury_accounts` (`BusinessId`, `Name`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE INDEX `IX_treasury_accounts_HolderId_BusinessId` ON `treasury_accounts` (`HolderId`, `BusinessId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE INDEX `IX_treasury_allocations_BusinessId_OwnerId_AccountId` ON `treasury_allocations` (`BusinessId`, `OwnerId`, `AccountId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE INDEX `IX_treasury_allocations_BusinessId_ProjectId` ON `treasury_allocations` (`BusinessId`, `ProjectId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE INDEX `IX_treasury_allocations_MovementId_BusinessId_AccountId` ON `treasury_allocations` (`MovementId`, `BusinessId`, `AccountId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE INDEX `IX_treasury_allocations_OwnerId_BusinessId` ON `treasury_allocations` (`OwnerId`, `BusinessId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE INDEX `IX_treasury_allocations_ProjectId_BusinessId` ON `treasury_allocations` (`ProjectId`, `BusinessId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE INDEX `IX_treasury_allocations_ResponsibleId_BusinessId` ON `treasury_allocations` (`ResponsibleId`, `BusinessId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE INDEX `IX_treasury_movements_AccountId_BusinessId` ON `treasury_movements` (`AccountId`, `BusinessId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE INDEX `IX_treasury_movements_BusinessId_AccountId_BookedOn` ON `treasury_movements` (`BusinessId`, `AccountId`, `BookedOn`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE INDEX `IX_treasury_movements_CounterpartyId_BusinessId` ON `treasury_movements` (`CounterpartyId`, `BusinessId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE UNIQUE INDEX `ux_treasury_movement_reference` ON `treasury_movements` (`AccountId`, `NormalizedReference`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE INDEX `IX_treasury_operations_AccountId_BusinessId` ON `treasury_operations` (`AccountId`, `BusinessId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE INDEX `IX_treasury_operations_MovementId_BusinessId_AccountId` ON `treasury_operations` (`MovementId`, `BusinessId`, `AccountId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE UNIQUE INDEX `ux_treasury_operation_request` ON `treasury_operations` (`BusinessId`, `RequestId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE INDEX `IX_treasury_parties_BusinessId_Name` ON `treasury_parties` (`BusinessId`, `Name`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE INDEX `IX_treasury_projects_BusinessId_Name` ON `treasury_projects` (`BusinessId`, `Name`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE INDEX `IX_treasury_projects_OwnerId_BusinessId` ON `treasury_projects` (`OwnerId`, `BusinessId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    CREATE INDEX `IX_treasury_projects_ResponsibleId_BusinessId` ON `treasury_projects` (`ResponsibleId`, `BusinessId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113220305_InitialMySqlWorkspace') THEN

    INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
    VALUES ('20261113220305_InitialMySqlWorkspace', '8.0.33');

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

COMMIT;

START TRANSACTION;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113221419_PreserveNormalizedReferenceAccents') THEN

    ALTER TABLE `treasury_movements` MODIFY COLUMN `NormalizedReference` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113221419_PreserveNormalizedReferenceAccents') THEN

    ALTER TABLE `purchases` MODIFY COLUMN `NormalizedReference` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20261113221419_PreserveNormalizedReferenceAccents') THEN

    INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
    VALUES ('20261113221419_PreserveNormalizedReferenceAccents', '8.0.33');

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

COMMIT;

