USE [db_ab2f76_adres];
GO

-- Elimina la tabla si existe
DROP TABLE IF EXISTS Adquisiciones;
GO

-- Crea la tabla Adquisiciones
CREATE TABLE Adquisiciones (
    Id INT IDENTITY(1,1) PRIMARY KEY,       -- Identificador �nico de la adquisici�n
    Presupuesto DECIMAL(18,2),              -- Monto asignado
    Unidad VARCHAR(100),                    -- Unidad administrativa responsable
    TipoBienServicio VARCHAR(255),          -- Descripci�n del tipo de bien o servicio
    Cantidad INT,                           -- N�mero de unidades
    ValorUnitario DECIMAL(18,2),            -- Costo por unidad
    ValorTotal AS (Cantidad * ValorUnitario), -- C�lculo del costo total
    FechaAdquisicion DATE,                  -- Fecha de la adquisici�n
    Proveedor VARCHAR(255),                 -- Entidad proveedora
    Documentacion TEXT                      -- Detalles de la documentaci�n (�rdenes de compra, facturas, etc.)
);
GO

-- Procedimiento almacenado para CRUD de Adquisiciones
CREATE OR ALTER PROCEDURE CRUD_Adquisiciones
    @Opcion VARCHAR(10),                   -- Opci�n para determinar la operaci�n (Insertar, Actualizar, Eliminar, Leer)
    @Id INT = NULL,                        -- ID de la adquisici�n (solo para actualizar o eliminar)
    @Presupuesto DECIMAL(18,2) = NULL,     -- Monto asignado
    @Unidad VARCHAR(100) = NULL,           -- Unidad administrativa responsable
    @TipoBienServicio VARCHAR(255) = NULL, -- Descripci�n del tipo de bien o servicio
    @Cantidad INT = NULL,                  -- N�mero de unidades
    @ValorUnitario DECIMAL(18,2) = NULL,   -- Costo por unidad
    @FechaAdquisicion DATE = NULL,         -- Fecha de la adquisici�n
    @Proveedor VARCHAR(255) = NULL,        -- Entidad proveedora
    @Documentacion TEXT = NULL            -- Detalles de la documentaci�n
AS
BEGIN
    SET NOCOUNT ON;

    IF @Opcion = 'Insertar'  -- Insertar nueva adquisici�n
    BEGIN
        INSERT INTO Adquisiciones (Presupuesto, Unidad, TipoBienServicio, Cantidad, ValorUnitario, FechaAdquisicion, Proveedor, Documentacion)
        VALUES (@Presupuesto, @Unidad, @TipoBienServicio, @Cantidad, @ValorUnitario, @FechaAdquisicion, @Proveedor, @Documentacion);
    END

    ELSE IF @Opcion = 'Actualizar'  -- Actualizar adquisici�n existente
    BEGIN
        IF @Id IS NOT NULL
        BEGIN
            UPDATE Adquisiciones
            SET 
                Presupuesto = @Presupuesto,
                Unidad = @Unidad,
                TipoBienServicio = @TipoBienServicio,
                Cantidad = @Cantidad,
                ValorUnitario = @ValorUnitario,
                FechaAdquisicion = @FechaAdquisicion,
                Proveedor = @Proveedor,
                Documentacion = @Documentacion
            WHERE Id = @Id;
        END
    END

    ELSE IF @Opcion = 'Eliminar'  -- Eliminar adquisici�n
    BEGIN
        IF @Id IS NOT NULL
        BEGIN
            DELETE FROM Adquisiciones WHERE Id = @Id;
        END
    END

    ELSE IF @Opcion = 'Leer'  -- Leer adquisiciones
    BEGIN
        SELECT * FROM Adquisiciones;
    END
    ELSE
    BEGIN
        PRINT 'Opci�n no v�lida. Use "Insertar", "Actualizar", "Eliminar" o "Leer".';
    END
END;
GO

EXEC CRUD_Adquisiciones 
	@Opcion = 'Leer'

-- // DATOS DE ACCESO A LA BASE DE DATOS
-- SERVER: sql1002.site4now.net
-- DATABASE: db_ab2f76_adres
-- PASS: IronMan2024.*.
-- USER: db_ab2f76_adres_admin